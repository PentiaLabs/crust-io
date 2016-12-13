'use strict';

// TODO: permalinking (in the middle of being developed)
// TODO: sorting (and generally sending tree structure up to front)
// TODO: search indexing
// TODO:
// write a compiler that can read configuration, meta-data and content and compile through various renderers:
//  - one that can write html (DONE)
//  - one that can write json index files for each node

const readConfigs = require('./lib/readConfigs');
const templateReader = require('./lib/readTemplate');
const contentPreparator = require('./lib/prepareContent');
const permalinking = require('./lib/permalinking');
const nunjucks = require('nunjucks');

class Crust {
	constructor( opts ) {
		this.opts = Object.assign({
			isEditor : false // TODO: future feature - by setting this to true we can inject something into the templating, where we'll be able to do wysiwyg stuff
		}, opts);

		this.folder = '';
		this.sourceFolder = opts.sourceFolder;
		this.permalinks = {};
		this.configs = {};

		// TODO: this is just squashed in here for poc purposes - needs to be prettier
		nunjucks.configure(opts.templatePath, { autoescape: false });
	}

	// get alle config files for each leaf in the file structure - we'll need all of them to do permalinking
	configuring () {
		return readConfigs.read( this.opts.sourceFolder );
	}

	// get permalink map
	permalinking () {
		return permalinking( this.sourceFolder );
	}

	// let's get a hold the template needed for the leaf we're currently working with
	readTemplate () {
		return templateReader( this.opts, this.folder );
	}

	// let's prepare the content for the leaf we're currently working with
	prepareContent ( template ) {
		return contentPreparator( this.folder, template );
	}

	compile( folder ) {
		this.folder = folder;

		return this.configuring()
			.then( config => {
				this.configs = config;
				return this.permalinking();
			})
			.then( permalinks => {
				this.permalinks = permalinks;
				return this.readTemplate();
			})
			.then( template => {
				return this.prepareContent(template);
			})
			.then( content => {
				// TODO: this is just squashed in here for poc purposes - needs to be prettier
				content = Object.assign( content, this.permalinks );

				return {
					contents : nunjucks.render( this.configs[this.folder].template + '.html', content),
					folder : this.folder
				};
			})
			.catch( reason => {
				// TODO: handle promise rejection properly by sending reason back
				console.log( reason );
			});
	}
}

module.exports = Crust;
