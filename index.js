'use strict';

// TODO: sorting
// TODO: search indexing
// TODO:
// write a compiler that can read configuration, meta-data and content and compile through various renderers:
//  - one that can write html
//  - one that can write json index files for each node

// TODO: compile template

const readConfig = require('./lib/readConfig');
const readTemplate = require('./lib/readTemplate');
const prepareContent = require('./lib/prepareContent');

module.exports = (opts, folder) => {
	opts = Object.assign({
		isEditor : false // TODO: future feature - by setting this to true we can inject something into the templating, where we'll be able to do wysiwyg stuff
	}, opts);

	// let's just get our config file for this leaf in the file structure
	let configuring = readConfig( folder );

	// then let's get a hold of its template
	let templating = configuring.then( config => {
		return readTemplate( opts, config );
	} );

	// then let's prepare the content
	let contentPreparing = templating.then( template => {
		return prepareContent( folder, template );
	} );

	// and let's stitch everything together
	return Promise.all( [ configuring, templating, contentPreparing ] ).then( values => {
		//console.log(values[0]); // config
		//console.log(values[1]); // template
		console.log(values[2]); // content
	}, reason => {
		console.log(reason)
	});
};
