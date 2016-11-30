'use strict';

const fs = require('fs');
const glob = require('glob-promise');
const path = require('path');

// promisifying readFile
fs.readPlaceholderAsync = filename => {
	return new Promise( (resolve, reject) => {
		fs.readFile(filename, (err, buffer) => {
			if (err) {
				reject(err);
			}else{
				resolve({
					isMd : path.extname(filename) === '.md',
					placeholder : path.basename(filename).split('.')[0],
					content : buffer.toString()
				});
			}
		});
	});
};

// will come in handy when we want to do permalinking interpolation
//
// const returnPlaceholders = template => {
// 	const pattern = new RegExp('{{ crust_([a-zA-Z]+) }}', 'gm');
//
// 	let placeholders = [];
// 	let matches;
//
// 	while ( (matches = pattern.exec( template ) ) !== null ) {
// 		placeholders.push(matches[1]);
// 	}
//
// 	return placeholders;
// };

const getContentFiles = folder => {
	return glob( '{*.md,*.html}' , { cwd: folder });
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


module.exports = ( folder ) => {
	// first get all paths for content files that are placed in this folder
	let contentFilesList = getContentFiles( folder );

	// then read the content of all of them
	let contents = contentFilesList.then( contentFilesList => {
		return readContent( folder, contentFilesList );
	});

	// then store object with keys for placeholders in template that holds the content
	// for them, so we're ready for templating.
	let contentData = contents.then( placeholderData => {
		let placeholderContent = {};

		placeholderData.forEach( entry => {
			placeholderContent['crust_' + entry.placeholder] = entry.content;
		});

		// TODO: enable permalinking interpolation (this is where the currently unused returnPlaceholders will come into play)

		return placeholderContent;
	});

	// stitch it all together an return our object filled with data
	return Promise.all( [ contentData ] );
};
