var exec = require('shelljs').exec;
var path = require('path')
var fs = require('fs')
var output = path.resolve(__dirname, '../_tmp-build.js.map');
//
const getUsed = function(input) {
  //build the file with rollup
  let cmd = `./node_modules/.bin/rollup ${input} -c`
  exec(cmd)
  //parse the source map
  let files = JSON.parse(fs.readFileSync(output)).sources
  files.push(input)
  //resolve to absolute paths
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
  return files
}
module.exports = getUsed
