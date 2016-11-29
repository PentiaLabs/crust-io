'use strict';

const readConfig = require('./lib/readConfig');
const readTemplate = require('./lib/readTemplate');
const prepareContent = require('./lib/prepareContent');

module.exports = (opts, folder) => {
	opts = Object.assign({
		isEditor : false // TODO: future feature - by setting this to true we can inject something into the templating, where we'll be able to do wysiwyg stuff
	}, opts);

	let configuring = readConfig( folder );
	let templating = configuring.then( ( config ) => {
		return readTemplate( opts, config );
	} );
	let contentPreparing = templating.then( (template) => {
		return prepareContent( folder, template );
	} );


  // TODO: dataing / contentPreparing
    // TODO: permalinking
  // TODO: sorting
  // TODO: search indexing
  // TODO:
  // write a compiler that can read configuration, meta-data and content and compile through various renderers:
  //  - one that can write html
  //  - one that can write json index files for each node

  // TODO: compile template

	return Promise.all( [ configuring, templating, contentPreparing ] ).then(values => {
		//console.log(values[0]); // config
		//console.log(values[1]); // template
		console.log(values[2]);
	}, reason => {
		console.log(reason)
	});
};
