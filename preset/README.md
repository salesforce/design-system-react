# Babel Preset for Source Code

> A Babel 6 preset that makes Design System React compatible with Salesforce’s supported browsers. This enables a module bundler, such as Webpack, to transpile Design System React. Using this will make it easier to upgrade in the future without having to manually reconfigure your Babel settings to be compatible with new language features Design System React may use.

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
