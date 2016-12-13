'use strict';

const fs = require('fs');
const glob = require('glob-promise');
const path = require('path');
const yaml = require('js-yaml');

fs.readConfigFileAsync = filename => {
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

class ReadConfigs {
	constructor() {
		this.readThemOnce = false;
		this.configData = {};
	}

	getConfigs( folder ) {
		return glob( '**/config.yaml' , { cwd: folder });
	}

	readConfig ( folder, configFilesList ) {
		// setting correct paths for all files
		let newConfigFilesList = configFilesList.map( filename => path.join( folder , filename ));

		// running everything through our readConfigFileAsync method
		let fetches = newConfigFilesList.map( this.readConfigSingle );

		return Promise.all( fetches );
	}

	readConfigSingle ( filepath ) {
		return fs.readConfigFileAsync( filepath );
	}

	read ( sourceFolder ) {
		// let's make sure we don't go and read all the config files when we've done it once
		if ( this.readThemOnce ) {
			return this.configData;
		}

		// get all config files in entire source
		let configFilesList = this.getConfigs( sourceFolder );

		// then read the content of all of them
		let contents = configFilesList.then( configFilesList => {
			return this.readConfig( sourceFolder, configFilesList );
		});

		// then store object with keys for folders in our sourcetree that holds the configurations
		// for them, so we're ready for setting up.
		this.configData = contents.then( configurations => {
			let configContent = {};

			configurations.forEach( entry => {
				configContent[entry.pos] = yaml.safeLoad(entry.content);
			});

			this.readThemOnce = true;

			return configContent;
		}).catch( reason => {
			// TODO: handle promise rejection by sending reason back
			console.log(reason);
		});

		// stitch it all together an return our object ready to be filled with data
		return this.configData;
	}
}


const readConfigsSingleton = new ReadConfigs();
exports = module.exports = readConfigsSingleton;
