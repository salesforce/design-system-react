# Design System for React

### Accessible, localization-friendly, presentational React components

[![Build Status](https://api.travis-ci.org/salesforce/design-system-react.svg?branch=master)](https://travis-ci.org/salesforce/design-system-react) [![DeepScan Grade](https://deepscan.io/api/projects/1475/branches/4666/badge/grade.svg)](https://deepscan.io/dashboard/#view=project&pid=1475&bid=4666)

## Install

```
$ npm install @salesforce-ux/design-system @salesforce/design-system-react
```

## Getting Started

Welcome to the project! :wave: This library is the [React](https://facebook.github.io/react/) implementation of the [Salesforce Lightning Design System](https://www.lightningdesignsystem.com/). This library has a peer dependency on `@salesforce-ux/design-system`, `react`, and `react-dom`. It has been tested with React >=15.4.1 <16 and is stable despite its version number. Please polyfill this library in order to meet your target environment needs.

* [Usage](#usage)
* [Getting started](https://react.lightningdesignsystem.com/getting-started/)
* [Documentation and interactive examples](https://react.lightningdesignsystem.com)
* [Contributing](CONTRIBUTING.md)
* [Codebase overview](docs/codebase-overview.md)
* [Browser compatiblity and polyfills](docs/browser-compatibility.md)
* [Usage with Webpack](docs/webpack.md)

## Usage

### Quick Setup (CommonJS)

A CommonJS-compatible version has been included within the NPM package to allows usage without transpiling. Use the following named `import` syntax to access CommonJS components from `/lib/index.js`:

```
import { Button } from '@salesforce/design-system-react';

<Button label="Hello Button" />
```

### Recommended Usage (ES6 modules)

Recommended usage requires that your babel presets are set up correctly. `create-react-app` and environments that do not transpile code within `node_modules` are not compatible with the component import below. All the examples on the [documentation site](https://react.lightningdesignsystem.com/) use this syntax. You can use the Babel preset, `@salesforce/babel-preset-design-system-react`, to get started. [This preset](https://npmjs.com/package/@salesforce/babel-preset-design-system-react) will keep Babel compatible with Design System React and allow ES6 module benefits such as tree-shaking. This library is not browser-ready and should be polyfilled to your target environment.

```
import Button from '@salesforce/design-system-react/components/button';

<Button label="Hello Button" />
```

#### Transpile with `.babelrc` settings

```json
{
	"presets": ["@salesforce/babel-preset-design-system-react"]
}
```

### Icon Usage

Prior to v0.7.0, SLDS icons were bundled with the JavaScript. The 400KB+ icons bundle from [SLDS](https://www.lightningdesignsystem.com/) is no longer included. You will need to download the SLDS CSS and icons separately.

#### Serve icons publicly

Typically, scripts should be downloaded in the background without blocking the DOM. With React, this works best with [server side rendering](https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup). SLDS recommends placeholder stencils while scripts are initializing if the HTML cannot be served immediately. If you can serve the HTML, then icon SVGs should not be bundled and served like any other file. Set a path `context` for all child components with `<IconSettings>` at the top of your render tree:

```
import IconSettings from '@salesforce/design-system-react/components/icon-settings';

ReactDOM.render(
  <IconSettings iconPath="/assets/icons">
    <MyApp />
  </IconSettings>,
  document.getElementById('app')
)

// `/assets/icons` will be prepended to `/standard-sprite/svg/symbols.svg#account` within the SVG path
<svg aria-hidden="true" class="slds-icon">
  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"></use>
</svg>
```

```
// ExpressJS example
app.use('/assets/icons', express.static('node_modules/@salesforce-ux/icons/dist/salesforce-lightning-design-system-icons/'));
```

#### Bundle icons

If you use a module bundler, like Webpack, you can import the individual `sprite` files and assign them to the `<IconSettings>` sprite properties. Your SVG images will be bundled with your scripts and block the DOM from rendering until the script file is loaded.

```
import IconSettings from '@salesforce/design-system-react/components/icon-settings';

import standardSprite from '@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg';
...
...

ReactDOM.render(
  <IconSettings standardSprite={standardSprite}>
    <MyApp />
  </IconSettings>,
  document.getElementById('app')
)
```

Bundled script files are provided _only_ for convenience.

* `design-system-react.min.js` (700KB+) - includes icons in the JavaScript
* `design-system-react-components.min.js` (~400KB) - no icons.

## Contributing to the code base

#### Clone and develop locally with in-browser test server

```
git clone git@github.com:salesforce/design-system-react.git
npm install
npm start
open http://localhost:9001 http://localhost:8001
```

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) and [Test README](/tests/README.md) first. Then, create an issue to tell others you are working on a bug. If you would like to contribute a new component, create an issue with a list of proposed props to discuss with maintainers. Issues not addressed with pull requests may be closed eventually. Check out [who's contributing](https://github.com/salesforce/design-system-react/graphs/contributors) to the project.

## Licenses

* Source code is licensed under [BSD 3-Clause](https://git.io/sfdc-license)
* All icons and images are licensed under [Creative Commons Attribution-NoDerivatives 4.0](https://github.com/salesforce/licenses/blob/master/LICENSE-icons-images.txt)
* The Salesforce Sans font is licensed under our [font license](https://github.com/salesforce/licenses/blob/master/LICENSE-font.txt)

## Got feedback?

If you have support questions, please post a question to [StackOverflow](https://stackoverflow.com/questions/tagged/design-system-react) and tag with `design-system-react`. If you find any bugs, create a [GitHub Issue](https://github.com/salesforce/design-system-react/issues).
