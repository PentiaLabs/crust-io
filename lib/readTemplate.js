'use strict';

const fs = require('fs');
const path = require('path');

const readTemplate = (filename) => {
  return new Promise( (resolve, reject) => {
    fs.readFile(filename, (err, buffer) => {
        if (err) {
          reject(err);
        }else{
          resolve( buffer.toString() );
        }
    });
  });
};

module.exports = ( opts, config ) => {
  const templatePath = path.join( opts.templatePath, config.template + '.html');

  // TODO: do interpolation of tokens in promise chain

  return readTemplate( templatePath );
};

// '{{ crust_([a-zA-Z]+) }}', 'gm'





// set our options for this template rendering
// TODO: tidy up here!
// templateOptions = {
//     currentLanguage         : 'da',
//     title                   : pageData.structure.name,
//     currentLocation         : pageData.structure.path || 'empty',
//     slug                    : slugify(path.normalize(pageData.structure.path.replace('/', '-').toLowerCase())),
//     parent                  : pageData.structure.parent,
//     siblings                : structureMapIdent ? structureMapIdent.children : null,
//     children                : structureMapIdent ? structureMapIdent.children : null,
//     structure               : self.structure[0].children,
//     crustVars               : config.crustVars
// };
//
// // TODO: collect all warnings and present warnings in a bulk
//
// // assign our templateData into the options for the rendering of this template
// templateOptions = _.assign(templateOptions, self._interpretPlaceholders(template, pageData));
//
// templateCompiled = nunjucks.render(template, templateOptions);
//
// // make sure destination folder is available
// mkdirp.sync(path.join('.tmp', pageData.structure.path));
//
// // write compiled template with content to the correct structure in destinationfolder
// fs.writeFileSync(path.join('.tmp', pageData.structure.path, 'index.html'), templateCompiled);
