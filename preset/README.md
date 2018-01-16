# Babel Preset for Source Code

> A Babel 6 preset that compiles official ES2015+ down to ES5 by automatically determining the Babel plugins and polyfills you need based Salesforce's supported browsers. This includes the Design System for React project.

Currently contains transforms for all standard syntax that is [ES2017](https://tc39.github.io/ecma262/), `babel-preset-react` and the following lower-stage plugins:

* [proposal-object-rest-spread](https://github.com/tc39/proposal-object-rest-spread)
* [proposal-class-properties](https://github.com/tc39/proposal-class-public-fields)
* [syntax-export-default-from](https://github.com/tc39/proposal-export-default-from)
* [syntax-export-extensions](https://babeljs.io/docs/plugins/syntax-export-extensions/)
* [proposal-export-default](https://github.com/tc39/proposal-export-default-from)

## Install

```sh
$ npm install --save-dev @salesforce/babel-preset-design-system-react
```

## Usage

### With `.babelrc` (Recommended)

```json
{
  "presets": ["@salesforce/babel-preset-design-system-react"]
}
```

### With CLI

```sh
$ babel script.js --presets @salesforce/babel-preset-design-system-react
```

### With Node

```javascript
require('babel-core').transform('code', {
  presets: ['@salesforce/babel-preset-design-system-react']
});
```
