'use strict';

const crust = require('./index');
const gutil = require('gulp-util');
const through = require('through2');

module.exports = opts => {
	opts = Object.assign({
	}, opts);

	return through.obj(function (file, enc, cb) {
		if (!file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-crust', 'Streaming not supported'));
			return;
		}

    (crust( opts , file.path ), function (err, generatedHtml) {
			if (err) {
				cb(new gutil.PluginError('gulp-crust', err, {fileName: file.path}));
				return;
			}

			file.contents = new Buffer(generatedHtml);
			cb(null, file);
		});

		cb(null, file);
  });
};
