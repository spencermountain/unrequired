<div align="center">

  <div><code>unrequired</code></div>
  <div>find unused javascript files</div>
  <div><img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" /></div>

  <a href="https://npmjs.org/package/unrequired">
    <img src="https://img.shields.io/npm/v/unrequired.svg?style=flat-square" />
  </a>
</div>

in a big javascript project, sometimes you can forget to delete a unused file.

`linters` and `tree-shakers` are good at finding unused **code** in a module, but they can allow you to have a whole unused file somewhere in your project.

This script follows the require graph, and compares it to the `ls` output, to find any files that are potentially not being used.

`npm install -g unrequired`

`unrequired ./path/to/my/index.js`

There are probably some caveats to this, but running it may be helpful in a large javascript project.

It uses (💟) [browserify](http://browserify.org/) and [source-map-explorer](https://github.com/danvk/source-map-explorer).

MIT
