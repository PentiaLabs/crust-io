/*jslint node: true */
'use strict';

// var rread = require('readdir-recursive');
// var path = require('path');
// var dir = path.join(__dirname, 'app/source');

// var dirs = rread.dirSync(dir);

// debugger;

var dirm = require('dirmapper');
var path = require('path');
var dir = path.join(__dirname, 'app/source');

var dirs = dirm(dir);

debugger;