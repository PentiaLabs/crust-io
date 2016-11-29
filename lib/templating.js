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

const interpolateTokens = ( pattern, templateContent ) => {
  // nunjucks doesn't provide a clear way to get available placeholders in a template, so we need to figure this out ourselves,
  // so we're able to present warnings if content isn't filled out for a declared template placeholder

  // find all the placeholders inside the template
  let placeholders = [];

  while ( ( let matches = pattern.exec( templateContent ) ) !== null) {
    placeholders.push(matches[1]);
  }

  // TODO: so run through each of the placeholders, so we can find the corresponding content
  // or warn our user if content isn't defined for a declared block

  // TODO: return placeholderData so we can compile templates with the correct data.

  // Legacy from v.2
  //
  // // array for holding warnings
  // var issuesList = [];
  //
  // for (let i; i = 0; i < placeholders.length; i++) {
  //   // TODO: load placeholder data with promise
  //   var placeholderContent = pageData.placeholderContent[placeholders[i]];
  //   var templateOptions;
  //
  //   if (typeof placeholderContent !== 'undefined') {
  //     if (placeholderContent.isMd) { // if we have content from a markdown file, we should compile it
  //       placeholderData['crust_' + placeholders[i]] = marked(placeholderContent.content);
  //     }else{ // otherwise find links inside of html-source, compile template and put content into placeholder
  //       templateOptions = this._interpretPermalinks(placeholderContent.content, pageData);
  //
  //       placeholderData['crust_' + placeholders[i]] = nunjucks.renderString(placeholderContent.content, templateOptions);
  //     }
  //   }
  //   else {
  //     issuesList.push('Warning: Did not find content for placeholder: ' + placeholders[i] + ' in page: ' + pageData.structure.path);
  //   }
  // }
  //
  // // push warnings, if any
  // if (issuesList.length) {
  //   console.log(issuesList.join("\n"));
  // }
  //
  // return placeholderData;

};

module.exports = (opts, config) => {
  const templatePath = path.join( opts.templatePath, config.template + '.html');

  // TODO: do interpolation of tokens in promise chain

  return readTemplate( templatePath ).catch(
    ( reason ) => {
      console.error( reason );
    }
  );
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
