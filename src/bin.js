#!/usr/bin/env node
const unrequired = require('./index')
var path = require('path');
var fs = require('fs');

var input = process.argv[2];
if (!input) {
  console.error('must supply a entry point file to inspect');
  process.exit();
}

input = path.resolve(process.cwd(), input);
var isDirectory = fs.lstatSync(input).isDirectory();
if (isDirectory === true) {
  input = path.resolve(input, './index.js');
}

console.log('\nCompiling the javascript..\n');

var result = unrequired(input)
var all = result.all
var used = result.used
var diff = result.diff

console.log('');
console.log('found: ' + all.length + ' files');
console.log('using: ' + used.length + ' files');
console.log('');

if (all.length === 0 || used.length === 0) {
  console.log('couldn\'t figure-out this javascript build.');
  process.exit(0);
}

console.log('\n\n');

if (diff.length === 0) {
  console.log('all files required! nice work.');
  process.exit(1);
}

//pretty-print a bunch of them
diff = diff.slice(0, 100);
var base = path.dirname(input);
console.log('\n---- ' + diff.length + ' Unused files----');
diff.forEach(function(str) {
  str = './' + path.relative(base, str);
  console.log('   ' + str);
});
