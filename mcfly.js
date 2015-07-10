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
 var gulp = require('gulp');
 var marked = require('marked');
 var path = require('path');
 var Q = require('q');
 var _ = require('lodash');
 var $ = require('gulp-load-plugins')();

/**
 * McFly constructor.
 *
 * @api public
 */

 function McFly () {
  this.sourceFolder = '';
  this.template = '';
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

    _.each(children, self.generate.bind(self));
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
 * Recursively generate site from folder structure
 *
 * @param {String} level of file structure to generate from
 * @api public
 */

 McFly.prototype.generate = function (level) {
  var name = level.name,
  children = level.children,
  type = level.type,
  mdpath,
  mdcontent,
  opts;

  if (name === '..' || name === '') {
    return;
  }

  if (type === 'directory' && children && children.length) {
    mdpath = path.join(__dirname, this.sourceFolder, level.path, 'content.md');

    if (fs.existsSync(mdpath)) {
      mdcontent = fs.readFileSync(mdpath, 'utf8').replace(/\r\n|\r/g, '\n');

      console.log(name);

      // set options specifically for each swig generation
      opts = {
        defaults: { 
          cache: false,
          locals : { 
            markdown: function markdown() {
              return marked(mdcontent);
            } 
          }
        }
      };

      // TODO: make .tmp configurable
      gulp.src(this.template)
      .pipe($.swig(opts))
      .pipe(gulp.dest(path.join('.tmp', level.path)));
    }

    _.each(children, this.generate.bind(this));
  }
};

/**
 * Export the instance.
 */

 var inst = new McFly();
 exports = module.exports = inst;