var path = require('path');
var exec = require('shelljs').exec;
var srcMapExplorer = require('source-map-explorer')

//use paths, so libs don't need a -g
var browserify = path.resolve(__dirname, '../node_modules/.bin/browserify');
var output = path.resolve(__dirname, '../_tmp-build.js');

var getUsed = function(input) {
  //browserify + derequire
  var cmd = browserify + ' ' + input + ' --debug';
  cmd += ' >> ' + output;
  exec(cmd);

  let files = srcMapExplorer(output, {
    json: true
  }).files
  files = Object.keys(files)

  files = files.map(function(str) {
    str = path.resolve(str);
    return str;
  });
  //clean it up a bit
  files = files.filter(function(str) {
    if (!str) {
      return false
    }
    if (/_prelude.js$/.test(str)) {
      return false
    }
    if (/<unmapped>$/.test(str)) {
      return false
    }
    return true
  });
  //cleanup tmp file
  exec('rm ' + output);
  // console.log(files)
  return files
};
module.exports = getUsed;
