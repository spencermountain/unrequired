var test = require('tape');
var unrequired = require('../src/index')

test('common-js', function(t) {
  var result = unrequired(__dirname + '/cjs/index.js')
  t.equal(result.all.length, 4, 'found 4 files');
  t.equal(result.used.length, 3, 'found 3 used');
  t.equal(result.unused.length, 1, 'found 1 unused');
  t.end();
});

// test('module-js', function(t) {
//   var result = unrequired(__dirname + '/mjs/index.js')
//   t.equal(result.all.length, 4, 'found 4 files');
//   t.equal(result.used.length, 3, 'found 3 used');
//   t.equal(result.unused.length, 1, 'found 1 unused');
//   t.end();
// });
