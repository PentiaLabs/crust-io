'use strict';

const fs = require('fs');
const path = require('path');
const readConfigs = require('./readConfigs');

const readTemplate = filename => {
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

module.exports = ( opts, folder ) => {
	return readConfigs.read( opts.sourceFolder ).then( ( config ) => {
		const templatePath = path.join( opts.templatePath, config[folder].template + '.html');

		return readTemplate( templatePath );
	});
};
