var exec = require('shelljs').exec
var path = require('path')
var fs = require('fs')
var output = path.resolve(__dirname, '../_tmp-build.js')
var config = path.resolve(__dirname, '../rollup.config.js')

const getUsed = function(input) {
  //build the file with rollup
  let cmd = `npx rollup ${input} -c ${config} --silent`
  exec(cmd)
  //parse the source map
  let files = JSON.parse(fs.readFileSync(output + '.map')).sources
  files.push(input)
  //resolve to absolute paths
  files = files.map(function(str) {
    str = path.resolve(str)
    return str
  })
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
  })
  //cleanup tmp file
  exec(`rm ${output} && rm ${output + '.map'}`)
  return files
}
module.exports = getUsed
