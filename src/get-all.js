var fs = require('fs');
var path = require('path');
//
var extensions = {
  '.js': true,
  '.json': true,
  '.jsx': true,
  '.mjs': true,
  '.ts': true,
  '.tsx': true,
};

var walkSync = function(dir, filelist ) {
  var name = path.basename(dir);
  if (name === 'node_modules' || name[0] === '.') {
    return filelist;
  }
  fs.readdirSync(dir).forEach(function(file) {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));

  });
  return filelist;
};

var getAll = function(entry) {
  var folder = path.dirname(entry);
  var files = walkSync(folder, []);

  files = files.map((str) => {
    return path.resolve(str);
  })

  files = files.filter(function(str) {
    //if not a javascript file
    var ext = path.extname(str);
    if (!ext || extensions[ext] !== true) {
      return false;
    }
    //ignore package.json and hidden files
    var name = path.basename(str);
    if (!name) {
      return false;
    }
    if (name === 'package.json' || name === 'package-lock.json') {
      return false;
    }
    if (name[0] === '.') {
      return false;
    }
    return true;
  });
  return files;
};
module.exports = getAll;
