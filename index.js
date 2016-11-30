'use strict';

// TODO: sorting
// TODO: search indexing
// TODO:
// write a compiler that can read configuration, meta-data and content and compile through various renderers:
//  - one that can write html (DONE)
//  - one that can write json index files for each node

// TODO: consider if we want a compile method like here: https://github.com/sindresorhus/gulp-nunjucks/blob/master/index.js

const readConfig = require('./lib/readConfig');
const readTemplate = require('./lib/readTemplate');
const prepareContent = require('./lib/prepareContent');
const nunjucks = require('nunjucks');

module.exports = (opts, folder) => {
	opts = Object.assign({
		isEditor : false // TODO: future feature - by setting this to true we can inject something into the templating, where we'll be able to do wysiwyg stuff
	}, opts);

	nunjucks.configure(opts.templatePath, { autoescape: false });

	// let's just get our config file for this leaf in the file structure
	let configuring = readConfig( folder );

	// when configuration is done, let's get a hold of its template
	let templating = configuring.then( config => {
		return readTemplate( opts, config );
	} );

	// and when that's done then let's prepare the content
	let contentPreparing = templating.then( template => {
		return prepareContent( folder, template );
	} );

	// and let's stitch everything together
	return Promise.all( [ configuring, templating, contentPreparing ] ).then( values => {
		let config = values[0];
		let content = values[2];

		// TODO: this is just squashed in here for poc purposes - needs to be prettier
		return {
			contents : nunjucks.render( config.template + '.html', content),
			folder : folder
		};
	}, reason => {
		console.log(reason);
	});
};
