'use strict';

const readConfigs = require('./readConfigs');

module.exports = ( sourceFolder ) => {
	return readConfigs.read( sourceFolder ).then( config => {
		let permalinkMap = {};

		config.forEach( leaf => {
			if (typeof leaf.permalink !== 'undefined') {
				permalinkMap[leaf.permalink] = leaf.folder;
			}
		});
		console.log(permalinkMap);

		return permalinkMap;
	});
};
