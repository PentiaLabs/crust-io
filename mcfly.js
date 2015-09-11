/*jslint node: true */
'use strict';

/*!
 * Pentia McFly
 *
 * Static site generator with support for hiearichal page structure
 *
 * ❤♥ Pentia ♥❤
 */

/**
 * Module dependencies.
 */

 var dirToJson = require('dir-to-json');
 var fs = require('fs');
 var walkSync = require('walk-sync');
 var mkdirp = require('mkdirp');
 var marked = require('marked');
 var path = require('path');
 var Q = require('q');
 var swig = require('swig');
 var yaml = require('js-yaml');
 var _ = require('lodash');

/**
 * McFly constructor.
 *
 * @api public
 */

 function McFly () {
  this.compilationQueue = [];
  this.sourceFolder = '';
  this.templateFolder = '';
  this.structure = {};
  this.menuStructure = [];
}

/**
 * Do complete compilation of McFly structure
 *
 * @param {String} path to parent dir of file structure to generate from
 * @param {Object} options
 *                  - sourceFolder  {String} : path to the folder where in the source files are placed
 *                  - template      {String} : path to the template to generate markdown into
 * @api public
 */

 McFly.prototype.compile = function (dir, opts) {
  var self = this;

  this.sourceFolder = opts.sourceFolder;
  this.templateFolder = opts.templateFolder;

  this._dirTree(dir).then(function (structure) {
    var children = structure.children;

    self.structure = [];
    self.structure.push(structure);

    _.each(children, self._traverse.bind(self));
  }).then(function () {
    _.each(self.compilationQueue, function (pageData) {
      var config = yaml.safeLoad(pageData.md);

      if (typeof config.template === 'undefined') {
        throw('Markdown files in source must contain a page type configuration.');
      }

      var swigOpts = { 
          title : pageData.structure.name,
          structure: self.structure[0].children,
          markdown: function markdown() { 
            return marked(pageData.md); 
          }
      };
      
      var template = path.join(self.templateFolder, config.template + '.html');

      var compiled = swig.renderFile(template, swigOpts);

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

 McFly.prototype._dirTree = function (filename) {
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

 McFly.prototype._readLevel = function (filepath) {
    return (filepath.split('\\').length - 1); // TODO: make sure that slash is right according to file system
  };

/**
 * Recursively run through and construct queue for site generation from folder structure
 *
 * @param {String} level of file structure to generate from
 * @api private
 */

 McFly.prototype._traverse = function (level) {
  var name = level.name,
  children = level.children,
  type = level.type,
  mdpath,
  mdcontent;

  if (name === '..' || name === '') {
    return;
  }

  if (type === 'directory' && children && children.length) {

    mdpath = path.join(__dirname, this.sourceFolder, level.path, 'content.md');

    if (fs.existsSync(mdpath)) {
      mdcontent = fs.readFileSync(mdpath, 'utf8').replace(/\r\n|\r/g, '\n');

      // set options specifically for each swig generation
      this.compilationQueue.push({
        md: mdcontent,
        structure : level
      });
    }

    _.each(children, this._traverse.bind(this));
  }
};

/**
 * Export the instance.
 */

 var inst = new McFly();
 exports = module.exports = inst;