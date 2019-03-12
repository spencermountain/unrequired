import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

module.exports = {
  treeshake: false,
  output: {
    file: './_tmp-build.js',
    format: 'iife',
    name: 'MyModule',
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};
