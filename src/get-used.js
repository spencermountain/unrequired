var exec = require('shelljs').exec;
var fs = require('fs');
var path = require('path');

//use paths, so libs don't need a -g
var browserify = path.resolve(__dirname, '../node_modules/.bin/browserify');
var output = path.resolve(__dirname, '../_tmp-build.js');
var tmpList = path.resolve(__dirname, '../_tmp-files.tsv');

//
const getUsed = function(input) {
  //cleanup. remove old builds
  if (fs.existsSync(output)) {
    exec('rm ' + output);
    exec('rm ' + tmpList);
  }
  exec('touch ' + output);
  exec('touch ' + tmpList);

  //browserify + derequire
  var cmd = browserify + ' ' + input + ' --debug';
  cmd += ' >> ' + output;
  exec(cmd);

  //inspect it
  exec('source-map-explorer ' + output + ' --tsv > ' + tmpList);

  var files = fs.readFileSync(tmpList).toString().split('\n');
  // files = files.filter((str) => str[0] === '.' || str[0] === '/');
  files = files.map((str) => {
    str = str.split('\t')[0];
    str = path.resolve(str);
    return str;
  });

  //cleanup tmp files
  exec('rm ' + output + ' && rm ' + tmpList);
  return files;
};
module.exports = getUsed;
