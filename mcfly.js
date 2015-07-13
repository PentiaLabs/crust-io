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
 var marked = require('marked');
 var mkdirp = require('mkdirp');
 var path = require('path');
 var Q = require('q');
 var swig = require('swig');
 var _ = require('lodash');

/**
 * McFly constructor.
 *
 * @api public
 */

 function McFly () {
  this.sourceFolder = '';
  this.template = '';

  this.compilationQueue = [];

  this.structure = {};
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
  this.template = opts.template;

  this._dirTree(dir).then(function (structure) {
    var children = structure.children;

    self.structure = structure;

    _.each(children, self._traverse.bind(self));
  }).then(function() {
    
    _.each(self.compilationQueue, function (opts) {

      var level = self._readLevel(opts.level.path);
      var parent, parentNode;
      var siblings = [];

      var swigOpts = { 
          title : opts.level.name,
          markdown: function markdown() { 
            return marked(opts.md); 
          },
          children: self.structure.children
      };

      // if we're on level 1, we want to list our siblings in a submenu
      if (level === 1) {
        parent = opts.level.path.split('\\')[0];
        parentNode = _.filter(self.structure.children, function (child) {
          return child.name === parent;
        })[0];

        siblings = _.filter(parentNode.children, function (child) {
          if (child.name === opts.level.name) {
            child.selected = true;
          }else{
            child.selected = false;
          }

          return child.type === 'directory';
        });

        swigOpts.siblings = siblings;
      }

      if (level === 2) {
        
      }

      var compiled = swig.renderFile(self.template, swigOpts);

      mkdirp.sync(path.join('.tmp', opts.level.path));

      fs.writeFileSync(path.join('.tmp', opts.level.path, 'index.html'), compiled);

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

//  /**
//  * Sort out a hierarchy structure that we can use in our menu generation
//  *
//  * @param {String} filepath for a folder in the structure
//  * @api private
//  */

//  McFly.prototype._createStructure = function (parts) {
//   var obj = {};

//   if (parts.length === 1) {
//     return parts[0];
//   }
    
//   obj[parts.shift()] = this._createStructure(parts);

//   return obj;
// };

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
        level : level
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