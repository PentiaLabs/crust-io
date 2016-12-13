'use strict';

const readConfigs = require('./readConfigs');
const path = require('path');

module.exports = function( sourceFolder ) {

	return readConfigs.read( sourceFolder ).then( config => {
		let permalinkMap = {};

		for (let leaf in config) {
			if (typeof config[leaf].permalink !== 'undefined') {
				permalinkMap['crust__' + config[leaf].permalink] = path.relative( sourceFolder, leaf );
			}
		}

		return permalinkMap;
	});
};
