'use strict';

const Crust = require('./index');
const gutil = require('gulp-util');
const path = require('path');
const through = require('through2');

module.exports = opts => {
	return through.obj( function (file, enc, callback) {
		// we don't take kindly to non-directories around here
		if (!file.isNull()) {
			callback();
			return;
		}

		if (file.isStream()) {
			callback(new gutil.PluginError('gulp-crust', 'Streaming not supported'));
			return;
		}

		opts = Object.assign({
			sourceFolder: file.base
		}, opts);

		let stream = this;

		(new Crust( opts ).compile( file.path ).then( product => {

			// let's get the product into a file and into our stream
			let newFile = new gutil.File({
				base: file.base,
				path: path.join(product.folder, 'index.html'),
				contents: new Buffer(product.contents)
			});

			stream.push(newFile);

			callback(null, file);
		}));
	});
};
