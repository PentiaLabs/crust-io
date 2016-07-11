/*jslint node: true */
'use strict';

/*!
 * Pentia - crust-io
 *
 * Static site generator with support for hiearichal page structure
 *
 * ❤♥ Pentia ♥❤
 */

/**
 * Module dependencies.
 */
 var cwd = process.env.INIT_CWD;
 var dirToJson = require('dir-to-json');
 var findup = require('findup-sync');
 var fs = require('fs');
 var glob = require('glob');
 var mkdirp = require('mkdirp');
 var marked = require('marked');
 var nunjucks = require('nunjucks');
 var path = require('path');
 var Q = require('q');
 var slugify = require('slugify');
 var yaml = require('js-yaml');
 var _ = require('lodash');

/**
 * Crust constructor.
 *
 * @api public
 */

 function Crust () {
  this.compilationQueue = [];

  this.workingdir;
  this.sourceFolder = '';
  this.templateFolder = '';

  this.structure = {};
  this.configurationMap = {};
  this.permalinksMap = {};
  this.structureMap = {};
}

/**
 * Do complete compilation of Crust structure
 *
 * @param {String} path to parent dir of file structure to generate from
 * @param {Object} options
 *                  - sourceFolder  {String} : path to the folder where in the source files are placed
 *                  - template      {String} : path to the template to generate markdown into
 * @api public
 */

 Crust.prototype.compile = function (dir, opts) {
  var self = this;
  var templateContents = {};
  var workingdir;

  // set passed in folder settings
  this.sourceFolder = opts.sourceFolder;
  this.templateFolder = opts.templateFolder;

  // we want to build a map for all configurations inside our source folder
  this._buildConfigurationMap();

  // we'll be shoving generated markdown directly into nunjucks templates - so we need this to be unescaped
  nunjucks.configure({ autoescape: false });

  workingdir = findup(this.sourceFolder, { cwd: cwd });

  if (workingdir) {
    // so we found the source folder - let's find the dir that it resides in
    cwd = workingdir.split(path.relative(process.cwd(), this.sourceFolder))[0];

    // and change our current working directory to that one, because that's where we'll be working from.
    process.chdir(cwd);
  } else {
    // we don't want to play anymore
    throw new Error('Source folder not found');
  }

  this._dirTree(dir).then(function (structure) {
    //var children = structure.children;
    self.structure = [];
    self.structure.push(structure);

    self._traverse(structure);
  }).then(function () {
    var newStructure;

    Array.prototype.move = function (old_index, new_index) {
        while (old_index < 0) {
            old_index += this.length;
        }
        while (new_index < 0) {
            new_index += this.length;
        }
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
        return this; // for testing purposes
    };

    // remove all non-directory type files from the structure we're sending up to frontend
    // that way we can easily spec out menus
    var filtering = function (data) {
      return _.filter(data, function (obj) {
        // remove any double backslashed that dirToJson has cluttered strings up with
        obj.path = obj.path.replace(/\\/g, '\\');

        var objpath = slugify(obj.path).toLowerCase();
        console.log(obj.path);
        if (!objpath) {
          objpath = 'root';
        }

        if (obj.type === 'directory') {
          // cache obj for this particular path so we're able to reference it shallowly when needed
          self.structureMap[objpath] = obj;

          if (obj.children && obj.children.length) {
            obj.children = filtering(obj.children);

            if (obj.children.length === 0) {
              delete obj['children'];
            }

            obj.slug = slugify(obj.name).toLowerCase();

            // if this particular node has a sorting of children in its configuration, now is a good time to effectuate that order
            if (self.configurationMap[objpath] &&
                self.configurationMap[objpath].childSort &&
                self.configurationMap[objpath].childSort.length) {

              _.each(self.configurationMap[objpath].childSort, function(needle, newPos) {
                var haystack = _.map(obj.children, function(child) {
                  return child.name;
                });

                var existingPos = _.indexOf(haystack, needle);

                obj.children = obj.children.move(existingPos, newPos);
              });
            }
          }

          return obj;
        }
      });
    }

    // we should filter the file structure to get only folders back
    // to have the most clean data to generate menus from
    newStructure = filtering(self.structure);
    self.structure = newStructure;

    // let's run through the queue of pages that needs to be compiled
    _.each(self.compilationQueue, function (pageData) {
      var config = self.configurationMap[slugify(pageData.dictPath).toLowerCase()];

      var template, placeholder, links, templateOptions, templateCompiled;

      if (typeof config.template === 'undefined') {
        throw new Error('Config.yaml in source directories must contain a page type configuration.');
      }

      template = path.join(self.templateFolder, config.template + '.html');

      // set our options for this template rendering
      // TODO: tidy up here!
      templateOptions = {
          currentLanguage : 'da',
          title           : pageData.structure.name,
          path            : pageData.structure.path,
          slug            : slugify(path.normalize(pageData.structure.path.replace('/', '-').toLowerCase())),
          parent          : pageData.structure.parent,
          siblings        : self.structureMap[slugify(pageData.structure.parent).toLowerCase()] ? self.structureMap[slugify(pageData.structure.parent).toLowerCase()].children : null,
          children        : self.structureMap[slugify(pageData.structure.path).toLowerCase()] ? self.structureMap[slugify(pageData.structure.path).toLowerCase()].children : null,
          structure       : self.structure[0].children,
          crustVars       : config.crustVars
      };

      // TODO: collect all warnings and present warnings in a bulk

      // assign our templateData into the options for the rendering of this template
      templateOptions = _.assign(templateOptions, self._interpretPlaceholders(template, pageData));

      templateCompiled = nunjucks.render(template, templateOptions);

      // make sure destination folder is available
      mkdirp.sync(path.join('.tmp', pageData.structure.path));

      // write compiled template with content to the correct structure in destinationfolder
      fs.writeFileSync(path.join('.tmp', pageData.structure.path, 'index.html'), templateCompiled);
    });

  }).done();


};

/**
 * Will read all config.yaml files and map them to their locations - this way we'll be able to do easy lookups for certain configurations
 *
 * @api private
 */

Crust.prototype._buildConfigurationMap = function () {
  // TODO: rewrite this to async with a promise
  var self = this;
  var configurationFiles = glob.sync('**/config.yaml', { cwd: this.sourceFolder });

  _.each(configurationFiles, function (relpath) {
    var config;
    var mapPath = relpath.split('/config.yaml')[0];

    if (mapPath === 'config.yaml') {
      mapPath = 'root';
    }

    var filepath = path.join(self.sourceFolder, relpath);
    var filecontent = fs.readFileSync(filepath, 'utf8').replace(/\r\n|\r/g, '\n');

    // process yaml
    config = yaml.safeLoad(filecontent);

    // if there's a permalink for this particular configuration-file we want to store the token for easy lookup later
    if (typeof config.permalink !== 'undefined') {
      self.permalinksMap[config.permalink] = mapPath;
    }

    // and let's store the configuration for this path for easy lookup as well
    self.configurationMap[slugify(mapPath).toLowerCase()] = config;
  });
};

/**
 * Will parse out all placeholders inside a template and provide the necessary nunjucks options to
 * be able to interpolate the placeholders with content.
 *
 * TODO: DRY - _interpretPlaceholders and _interpretPermalinks should be merged in some sort
 *
 * @api private
 */

Crust.prototype._interpretPlaceholders = function (templatePath, pageData) {
  // nunjucks doesn't provide a clear way to get available placeholders in a template, so we need to figure this out ourselves,
  // so we're able to present warnings if content isn't filled out for a declared template placeholder
  var pattern = new RegExp('{{ crust_([a-zA-Z]+) }}', 'gm');
  var placeholderData = {};
  var templateContent, matches, placeholders, placeholderContent, i;
  //var patternLink = new RegExp('{{ crust__link (.+) }}', 'gm');

  // read the content of the template so we can find the placeholders
  templateContent = fs.readFileSync(templatePath, 'utf8');

  // find all the placeholders inside the template
  placeholders = [];
  while ((matches = pattern.exec(templateContent)) !== null) {
    placeholders.push(matches[1]);
  }

  // so run through each of the placeholders, so we can find the corresponding content
  // or warn our user if content isn't defined for a declared block

  // array for holding warnings
  var issuesList = [];

  for (i = 0; i < placeholders.length; i++) {
    var placeholderContent = pageData.placeholderContent[placeholders[i]];
    var templateOptions;

    if (typeof placeholderContent !== 'undefined') {
      if (placeholderContent.isMd) { // if we have content from a markdown file, we should compile it
        placeholderData['crust_' + placeholders[i]] = marked(placeholderContent.content);
      }else{ // otherwise find links inside of html-source, compile template and put content into placeholder
        templateOptions = this._interpretPermalinks(placeholderContent.content, pageData);

        placeholderData['crust_' + placeholders[i]] = nunjucks.renderString(placeholderContent.content, templateOptions);
      }
    }
    else {
      issuesList.push('Warning: Did not find content for placeholder: ' + placeholders[i] + ' in page: ' + pageData.structure.path);
    }
  }

  // push warnings, if any
  if (issuesList.length) {
    console.log(issuesList.join("\n"));
  }

  return placeholderData;
};

/**
 * Will parse out all permalinks inside a template and provide the necessary nunjucks options to
 * be able to interpolate the permalink tokens with actual links.
 *
 * TODO: DRY - _interpretPlaceholders and _interpretPermalinks should be merged in some sort
 *
 * @api private
 */

Crust.prototype._interpretPermalinks = function (templateContent, pageData) {
  // nunjucks doesn't provide a clear way to get available placeholders in a template, so we need to figure this out ourselves,
  // so we're able to present warnings if content isn't filled out for a declared template placeholder
  var pattern = new RegExp('{{ crust__link_(.+) }}', 'gm');
  var linkData = {};
  var matches, permalinks, placeholderContent, i;

  // find all the permalinks inside the template
  permalinks = [];
  while ((matches = pattern.exec(templateContent)) !== null) {
    permalinks.push(matches[1]);
  }

  // so run through each of the permalinks, so we can find the corresponding content
  // or warn our user if content isn't defined for a declared block
  for (i = 0; i < permalinks.length; i++) {
    var placeholderContent = this.permalinksMap[permalinks[i]];

    if (typeof placeholderContent !== 'undefined') {
      linkData['crust__link_' + permalinks[i]] = '/' + this.permalinksMap[permalinks[i]];
    }else{
      console.log('Warning: Did not find link for permalink: crust__link_', permalinks[i], 'in page:', pageData.structure.path);
    }
  }

  return linkData;
};

/**
 * Return folder structure in json from directory tree recursively
 *
 * @param {String} path to filename to crawl file structure from
 * @api private
 */

 Crust.prototype._dirTree = function (filename) {
   var folders = Q.defer();

   dirToJson(filename, function( err, dirTree ){
    if( err ){
      throw err;
    }else{
      folders.resolve(dirTree);
    }
  });

   return folders.promise;
 };

/**
 * Let's find out which level a directory lies at
 *
 * @param {String} Complete filepath
 * @api private
 */

 Crust.prototype._readLevel = function (filepath) {
    return (filepath.split('\\').length - 1); // TODO: make sure that slash is right according to file system
  };

/**
 * Replace \\ with _ to have paths translate into platform independent keys
 *
 * @param {String} Complete filepath as a string
 * @api private
 */

 Crust.prototype._normalizePathString = function (pathstring) {
    return pathstring.replace(/\\/g, '_');
  };


/**
 * Recursively run through and construct queue for site generation from folder structure
 *
 * @param {String} level of file structure to generate from
 * @api private
 */

 Crust.prototype._traverse = function (level) {
  var name = level.name,
  children = level.children,
  type = level.type,
  placeholderContent = {},
  dirPath,
  configPath,
  contentFiles,
  configuration,
  dictPath;

  if (name === '..' || name === '') {
    return;
  }

  if (type === 'directory' && children && children.length) {

    dirPath = path.join(cwd, this.sourceFolder, level.path);

    dictPath = level.path;
    if (!dictPath) {
      dictPath = 'root';
    }

    // we support both md and html files to be injected into our placeholders, so let's look for those types
    contentFiles = glob.sync('{*.md,*.html}', { cwd: dirPath });
    configPath = path.join(dirPath, 'config.yaml');

    // run through each an find the content
    _.each(contentFiles, function(filename) {
      var completeFilepath = path.join(dirPath, filename);
      var contentObj = {};
      contentObj.content = fs.readFileSync(completeFilepath, 'utf8').replace(/\r\n|\r/g, '\n');
      contentObj.isMd = path.extname(filename) === '.md';

      placeholderContent[filename.split('.')[0]] = contentObj;
    });

    // find the configuration for this particular page
    if (fs.existsSync(configPath)) {
      configuration = fs.readFileSync(configPath, 'utf8').replace(/\r\n|\r/g, '\n');
    } else {
      throw new Error('No configuration found. Tried (' + configPath + ')');
    }

    // set options specifically for each nunjucks generation
    this.compilationQueue.push({
      placeholderContent: placeholderContent,
      config: configuration,
      structure : level,
      dictPath : dictPath
    });

    _.each(children, this._traverse.bind(this));
  }
};

/**
 * Export the instance.
 */

 var inst = new Crust();
 exports = module.exports = inst;