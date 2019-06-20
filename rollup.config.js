import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import typescript from 'rollup-plugin-typescript'
import babel from 'rollup-plugin-babel'

module.exports = {
  treeshake: false,
  output: {
    file: './_tmp-build.js',
    format: 'iife',
    name: 'MyModule',
    sourcemap: true,
  },
  plugins: [resolve(), commonjs(), json(), babel(), typescript()],
}
