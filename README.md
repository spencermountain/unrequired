<div align="center">
  you may want to try the library <a href="https://github.com/smeijer/unimported">@smeijer/unimported</a> instead of this one.
  <div>it's pretty great</div>
</div>
<!-- spacer -->
<img height="15px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>


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

or from a node script:
```js
const unrequired = require('unrequired')
let result = unrequired('./tests/mjs/index.js')
console.log(result)
/*
{
  all:[ ... ],  // all javascript files from a 'ls'
  used:[ ... ], // all files in the sourcemap bundle
  unused:[],    // the diff between the two
}
*/
```

running it may be helpful in a large javascript project! who knows.

It uses [rollup](https://rollupjs.org) ⭐️

### Caveats
JSX, and other variants are not currently supported.

It atleast attempts to support `esmodules`, `.mjs files`, and some other things.

it won't catch any unrequired `.json` files.

## See Also
* [unused-webpack-plugin](https://github.com/MatthieuLemoine/unused-webpack-plugin) by Matthieu Lemoine
* [node-trucker](https://github.com/davidmfoley/node-trucker) by Dave Foley

MIT
