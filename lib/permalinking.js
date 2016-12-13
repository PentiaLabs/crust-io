'use strict';

const readConfigs = require('./readConfigs');
const path = require('path');

module.exports = function( sourceFolder ) {

	return readConfigs.read( sourceFolder ).then( config => {
		let permalinkMap = {};

		for (let leaf in config) {
			if (typeof config[leaf].permalink !== 'undefined') {
				// TODO: test this out on windows - if slashes are wrong utliize https://github.com/sindresorhus/slash
				permalinkMap['crust__' + config[leaf].permalink] = path.join('/', path.relative( sourceFolder , leaf ) );
			}
		}

		return permalinkMap;
	});
};
