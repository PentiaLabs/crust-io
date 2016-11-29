'use strict';

const readConfig = require('./lib/readConfig');
const templating = require('./lib/templating');

module.exports = (opts, folder) => {
  opts = Object.assign({
	}, opts);

  readConfig( folder ).then(
      (config) => {
        templating( opts, config ).then(
            (template) => {
              console.log(opts);
              console.log(config);
              console.log(template);
            }
          )
        }
    )
    .catch(function ( reason ) {
      console.error( reason );
    });

    // TODO: read template
      // TODO: read which .md-/.html-files to read in and replace
    // TODO: remember to send up correct structure before compiling template
    // TODO: compile template
    // TODO: interpolate permalinking in template
    // TODO:
    // write a compiler that can read configuration, meta-data and content and compile through various renderers:
    //  - one that can write html
    //  - one that can write json index files for each node

    // legacy

      // TODO:
      // find working dir
};
