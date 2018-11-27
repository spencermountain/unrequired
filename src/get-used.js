var exec = require('shelljs').exec;
var fs = require('fs');
var path = require('path');

//use paths, so libs don't need a -g
var browserify = path.resolve(__dirname, '../node_modules/.bin/browserify');
var srcMapExplorer = path.resolve(__dirname, '../node_modules/.bin/source-map-explorer');
var output = path.resolve(__dirname, '../_tmp-build.js');
var tmpList = path.resolve(__dirname, '../_tmp-files.tsv');

//
var getUsed = function(input) {
  //cleanup. remove old builds
  if (fs.existsSync(output)) {
    exec('rm ' + output);
  }
  if (fs.existsSync(tmpList)) {
    exec('rm ' + tmpList);
  }
  exec('touch ' + output);
  exec('touch ' + tmpList);

  //browserify + derequire
  var cmd = browserify + ' ' + input + ' --debug';
  cmd += ' >> ' + output;
  exec(cmd);

  //inspect it
  exec(srcMapExplorer + ' ' + output + ' --tsv > ' + tmpList);

  var files = fs.readFileSync(tmpList).toString().split('\n');
  files = files.map(function(str) {
    str = str.split('\t')[0];
    str = path.resolve(str);
    return str;
  });
  files = files.filter(function(str) {
    return str;
  });
  //cleanup tmp files
  exec('rm ' + output + ' && rm ' + tmpList);
  return files;
};
module.exports = getUsed;
