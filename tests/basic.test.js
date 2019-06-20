var test = require('tape')
var unrequired = require('../src/index')

test('common-js', function(t) {
  var result = unrequired(__dirname + '/cjs/index.js')
  t.equal(result.all.length, 5, 'found 5 files')
  t.equal(result.used.length, 3, 'found 3 used')
  t.equal(result.unused.length, 2, 'found 2 unused')
  t.end()
})

test('module-js', function(t) {
  var result = unrequired(__dirname + '/mjs/index.js')
  t.equal(result.all.length, 4, 'found 4 files')
  t.equal(result.used.length, 3, 'found 3 used')
  t.equal(result.unused.length, 1, 'found 1 unused')
  t.end()
})

test('json-loading', function(t) {
  var result = unrequired(__dirname + '/json/index.js')
  t.equal(result.all.length, 3, 'found 3 files')
  t.equal(result.used.length, 2, 'found 2 used')
  t.equal(result.unused.length, 1, 'found 1 unused')
  t.end()
})

test('jsx', function(t) {
  var result = unrequired(__dirname + '/jsx/index.js')
  t.equal(result.all.length, 4, 'found 4 files')
  t.equal(result.used.length, 3, 'found 3 used') // TODO:not the right files
  // t.equal(result.unused.length, 1, 'found 1 unused')//TODO: failing
  t.end()
})

// test('ts', function(t) {
//   var result = unrequired(__dirname + '/ts/index.js')
//   t.equal(result.all.length, 4, 'found 4 files')
//   t.equal(result.used.length, 3, 'found 3 used')
//   t.equal(result.unused.length, 1, 'found 1 unused')
//   t.end()
// })
