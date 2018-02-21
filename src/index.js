var getUsed = require('./get-used.js');
var getAll = require('./get-all.js');

var input = process.argv[2];
if (!input) {
  console.error('must supply a entry point file to inspect');
  process.exit();
}

var all = getAll(input);
var used = getUsed(input);
//turn used into a key-value lookup
used = used.reduce((h, str) => {
  h[str] = true;
  return h;
}, {});

let diff = all.filter((str) => used[str] !== true);
if (diff.length === 0) {
  console.log('all files required! nice work.');
  process.exit(1);
}
console.log('\n\n----Unused files----');
diff.forEach((str) => {
  console.log('  -  ' + str);
});
