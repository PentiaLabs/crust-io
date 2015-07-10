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

    _.each(children, self.queue.bind(self));
  }).then(function() {   

    _.each(self.compilationQueue, function (opts) {

      var swigOpts = { 
          title : opts.level.name,
          markdown: function markdown() { 
            return marked(opts.md); 
          } 
      };

      var compiled = swig.renderFile(self.template, swigOpts);

      mkdirp.sync(path.join('.tmp', opts.level.path));

      fs.writeFileSync(path.join('.tmp', opts.level.path, opts.level.name + '.html'), compiled);

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
 * Recursively run through and construct queue for site generation from folder structure
 *
 * @param {String} level of file structure to generate from
 * @api public
 */

 McFly.prototype.queue = function (level) {
  var name = level.name,
  children = level.children,
  type = level.type,
  mdpath = '',
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

    _.each(children, this.queue.bind(this));
  }
};

/**
 * Export the instance.
 */

 var inst = new McFly();
 exports = module.exports = inst;