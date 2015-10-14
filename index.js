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
 var cwd = process.cwd();
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
  this.sourceFolder = '';
  this.templateFolder = '';
  this.structure = {};
  this.workingdir;
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
  var templateContents = {};
  var self = this;
  var workingdir;

  // we'll be shoving generated markdown directly into nunjucks templates - so we need this to be unescaped
  nunjucks.configure({ autoescape: false });

  this.sourceFolder = opts.sourceFolder;
  this.templateFolder = opts.templateFolder;

  workingdir = findup(this.sourceFolder, { cwd: process.cwd() });

  if (workingdir) {
    // so we found the source folder - let's find the dir that it resides in
    cwd = workingdir.split(this.sourceFolder)[0];

    // and change our current working directory to that one, because that's where we'll be working from.
    process.chdir(cwd);
  } else {
    // we don't want to play anymore
    throw('Source folder not found');
  }

  this._dirTree(dir).then(function (structure) {
    var children = structure.children;

    self.structure = [];
    self.structure.push(structure);

    _.each(children, self._traverse.bind(self));
  }).then(function () {
    var newStructure;

    // remove all non-directory type files from the structure we're sending up to frontend
    // that way we can easily spec out menus
    var filtering = function (data) {
      return _.filter(data, function (obj) {
        if (obj.type === 'directory') {
          if (obj.children && obj.children.length) {
            obj.children = filtering(obj.children);

            if (obj.children.length === 0) {
              delete obj['children'];
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
      var config = yaml.safeLoad(pageData.config);

      if (typeof config.template === 'undefined') {
        throw('Config.yaml in source directories must contain a page type configuration.');
      }

      var template = path.join(self.templateFolder, config.template + '.html');

      // nunjucks doesn't provide a clear way to get available placeholders in a template, so we need to figure this out ourselves,
      // so we're able to present warnings if content isn't filled out for a declared template placeholder
      var pattern = new RegExp('{{ crust_(.+) }}', 'gm');

      // read the content of the template so we can find the placeholders
      if (!templateContents[template]) {
       templateContents[template] = fs.readFileSync(template, 'utf8');
      }

      // find all the placeholders inside the template
      var placeholders = [];
      var matches;
      while ((matches = pattern.exec(templateContents[template])) !== null) {
        placeholders.push(matches[1]);
      }

      // set our options for this template rendering
      var nunjucksOpts = { 
          currentLanguage : 'da',
          title           : pageData.structure.name,
          path            : pageData.structure.path,
          slug            : slugify(path.normalize(pageData.structure.path.replace('/', '-').toLowerCase())),
          parent          : pageData.structure.parent,
          structure       : self.structure[0].children
      };

      // so run through each of the placeholders, so we can find the corresponding content
      // or warn our user if content isn't defined for a declared block
      var i;
      for (i = 0; i < placeholders.length; i++) {
        var placeholderContent = pageData.placeholderContent[placeholders[i]];

        if (typeof placeholderContent !== 'undefined') {
          if (placeholderContent.isMd) { // if we have content from a markdown file, we should compile it
            nunjucksOpts['crust_' + placeholders[i]] = marked(placeholderContent.content);
          }else{ // otherwise just push it in
            nunjucksOpts['crust_' + placeholders[i]] = placeholderContent.content;
          }
        }else{
          console.log('Warning: Did not find content for placeholder:', placeholders[i], 'in page:', pageData.structure.path);
        }
      }

      var compiled = nunjucks.render(template, nunjucksOpts);

      mkdirp.sync(path.join('.tmp', pageData.structure.path));

      fs.writeFileSync(path.join('.tmp', pageData.structure.path, 'index.html'), compiled);
    });

  }).done();


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
  configuration;

  if (name === '..' || name === '') {
    return;
  }

  if (type === 'directory' && children && children.length) {

    dirPath = path.join(cwd, this.sourceFolder, level.path);

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
    }else{
      throw('No configuration found');
    }

    // set options specifically for each nunjucks generation
    this.compilationQueue.push({
      placeholderContent: placeholderContent,
      config: configuration,
      structure : level
    });

    _.each(children, this._traverse.bind(this));
  }
};

/**
 * Export the instance.
 */

 var inst = new Crust();
 exports = module.exports = inst;