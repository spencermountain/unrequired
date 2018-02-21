#!/usr/bin/env node
var path = require('path');
var fs = require('fs');
var getUsed = require('./get-used.js');
var getAll = require('./get-all.js');

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
var all = getAll(input);
var used = getUsed(input);

console.log('');
console.log('found: ' + all.length + ' files');
console.log('using: ' + used.length + ' files');
console.log('');

//turn used into a key-value lookup
used = used.reduce((h, str) => {
  h[str] = true;
  return h;
}, {});

console.log('\n\n\n');
let diff = all.filter((str) => used[str] !== true);
if (diff.length === 0) {
  console.log('all files required! nice work.');
  process.exit(1);
}
console.log('\n\n---- ' + diff.length + ' Unused files----');
diff = diff.slice(0, 100);
diff.forEach((str) => {
  console.log('  -  ' + str);
});
