'use strict';

const fs = require('fs');
const path = require('path');

const readTemplate = (filename) => {
	return new Promise( (resolve, reject) => {
		fs.readFile(filename, (err, buffer) => {
			if (err) {
				reject(err);
			}else{
				resolve( buffer.toString() );
			}
		});
	});
};

module.exports = ( opts, config ) => {
	const templatePath = path.join( opts.templatePath, config.template + '.html');

	return readTemplate( templatePath );
};
