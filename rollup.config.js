import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'

module.exports = {
  treeshake: false,
  output: {
    file: './_tmp-build.js',
    format: 'iife',
    name: 'MyModule',
    sourcemap: true,
  },
  plugins: [resolve(), commonjs(), json()],
}
