'use strict';

const crust = require('./index');
const gutil = require('gulp-util');
const path = require('path');
const through = require('through2');

module.exports = opts => {
	opts = Object.assign({
		ext: '.html'
	}, opts);

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

		let stream = this;

		// TODO: somewhere in this chain we'll need to generate search index files (maybe just another newFile : search.json)
		crust( opts , file.path ).then( product => {

			// let's get the product into a file and into our stream
			let newFile = new gutil.File({
				base: file.base,
				path: path.join(product.folder, 'index.html'),
				contents: new Buffer(product.contents)
			});

			stream.push(newFile);

			callback(null, file);
		});
	});
};
