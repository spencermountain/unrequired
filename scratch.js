const unrequired = require('./src/index')
// const doRollup = require('./src/rollup')

let result = unrequired('./tests/mjs/index.js')
console.log(result)
// let result = unrequired('./tests/mjs/index.js')
// console.log(doRollup('./tests/cjs/index.js'))
