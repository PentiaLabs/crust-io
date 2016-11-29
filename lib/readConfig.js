'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const returnConfig = ( folder ) => {
  return new Promise( (resolve, reject) => {
    fs.readFile(path.join(folder, 'config.yaml'), (err, buffer) => {
        if (err) {
          reject(err);
        }else{
          resolve( yaml.safeLoad( buffer.toString() ) );
        }
    });
  });
};

module.exports = ( folder ) => {
  return returnConfig( folder ).catch( ( reason ) => {
    console.error( reason );
  });
};
