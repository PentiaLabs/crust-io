'use strict';

const fs = require('fs');
const glob = require('glob-promise');
const path = require('path');
const yaml = require('js-yaml');

fs.readPlaceholderAsync = filename => {
	return new Promise( (resolve, reject) => {
		fs.readFile(filename, (err, buffer) => {
			if (err) {
				reject(err);
			}else{
				resolve({
					pos : filename.split('/config.yaml')[0],
					content : buffer.toString()
				});
			}
		});
	});
};

const getConfigs = folder => {
	return glob( 'config.yaml' , { cwd: folder });
};

const readContent = ( folder, contentFilesList ) => {
	// setting correct paths for all files
	let newContentFilesList = contentFilesList.map( filename => path.join( folder , filename ));

	// running everything through our readPlaceholderAsync method
	let fetches = newContentFilesList.map( readContentSingle );

	return Promise.all( fetches );
};

const readContentSingle = filepath => {
	return fs.readPlaceholderAsync( filepath );
};

module.exports = sourceFolder => {
	// get all config files in entire source
	let configFilesList = getConfigs( sourceFolder );

	// then read the content of all of them
	let contents = configFilesList.then( contentFilesList => {
		return readContent( sourceFolder, contentFilesList );
	});

	// then store object with keys for placeholders in template that holds the content
	// for them, so we're ready for templating.
	let contentData = contents.then( placeholderData => {
		let configContent = {};

		placeholderData.forEach( entry => {
			configContent[entry.filename] = yaml.safeLoad(entry.content);
		});

		return configContent;
	});

	// stitch it all together an return our object ready to be filled with data
	return contentData;
};
