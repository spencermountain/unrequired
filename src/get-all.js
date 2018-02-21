var fs = require('fs');
var path = require('path');
//

const walkSync = (dir, filelist = [] ) => {
  fs.readdirSync(dir).forEach(file => {

    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));

  });
  return filelist;
};

var getAll = function(entry) {
  var folder = path.dirname(entry);
  let files = walkSync(folder, []);
  return files;
};
module.exports = getAll;
