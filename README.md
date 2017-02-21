# Salesforce Lightning Design System for JavaScript
### Accessible, localization-friendly, presentational React components

[![Greenkeeper badge](https://badges.greenkeeper.io/salesforce-ux/design-system-react.svg?token=d2cfefd2da2a20e86d13d4573674ef5de0309484252f32f0693593bef29e8f0b)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.com/salesforce-ux/design-system-react.svg?token=BMXxPFKR5GZuYsqAFsEf&branch=master)](https://travis-ci.com/salesforce-ux/design-system-react)

## Overview
Welcome to the project! :wave: This is an internal open source project and contributions are expected from production teams consuming this library. There is only one engineer 100%-aligned to this project at this moment. All other contributors are on production teams that ship end-product with releases dates, too.

Please visit [Design System React](https://react.lightningdesignsystem.com/) for documentation and examples of using the Design System React components. The documentation site has a [Getting Started Guide](https://react.lightningdesignsystem.com/getting-started/) and a [FAQ](https://react.lightningdesignsystem.com/faq/) page. If you are new to this project or React, please review the [Concepts and Best Practices](https://react.lightningdesignsystem.com/contributing/#concepts-and-best-practices) section of the [Contributing](https://react.lightningdesignsystem.com/contributing/) page. It will help you with the approach of this library and offer some suggestions for your own components.

The Design System React library is the [React](https://facebook.github.io/react/) implementation of the [Lightning Design System](https://www.lightningdesignsystem.com/). Each Design System React component is a specific variant of a component from Lightning Design System. For example, `SLDSMenuDropdown` represents [Lightning Design System Menu > Dropdown](http://www.lightningdesignsystem.com/components/menus/#dropdown),
and `SLDSLookup` represents [Lightning Design System Lookup > Base](http://www.lightningdesignsystem.com/components/lookups/#base).

#### Multiple packages for different module loaders

_It is highly recommended that you `npm install` the `-es` suffixed package tag and import the individual [ECMAScript 6](https://github.com/lukehoban/es6features/blob/master/README.md) source files in `./components/`._ If you do this, you will need to enable your ES5 transpiler to allow [stage-1 and higher proposed features](https://babeljs.io/docs/plugins/preset-stage-1/). If you are using Babel, it may be helpful to install the [NPM module](https://www.npmjs.com/package/babel-preset-stage-1) `babel-preset-stage-1` into your project and review the `.babelrc` file in this project.

If you are looking for a a [CommonJS](https://nodejs.org/docs/latest/api/modules.html)-compatible package, use the package tag that does not have a suffix.

### Run local development and testing server

```
npm install
npm start
open http://localhost:9001
open http://localhost:8001
```

### Run command line tests

```
npm test
```

### Run build

```
npm run dist
```

## Getting Started

`design-system-react` should be paired with React 15.x and Lightning Design System 2.2.x. You can find a more complete [getting started guide](https://react.lightningdesignsystem.com/getting-started/) on the documentation site.

### New to React?

Take a look at our [recommended reading list](https://react.lightningdesignsystem.com/resources/) on the documentation site and level up on your knowledge. The reading list also includes helpful articles on Redux, Webpack, ES6, and structuring your app. The [Concepts and Best Practices](https://react.lightningdesignsystem.com/contributing/#concepts-and-best-practices) section of the [Contributing](https://react.lightningdesignsystem.com/contributing/) page will help you understand the approach of this library and offer some suggestions for your own components, too.

### NPM

Because this project is not open-sourced yet, we cannot publish it to npm. Therefore we have a build script that compiles `components/` to es5 and outputs it to a tagged git release where outside projects pull from. Add the following line to your `package.json` devDependencies and run `npm install`.

```
# package.json

"design-system-react": "git+ssh://git@github.com:salesforce-ux/design-system-react.git#v[VERSION]",
```

Then, in your React code, import each Lightning Design System component you need.

For example to import the Tooltip and Icon components:

```
import SLDSPopoverTooltip from 'design-system-react/components/popover-tooltip';
import SLDSIcon from 'design-system-react/components/icon';
```

You can then use the components in your JSX markup, e.g. SLDSPopoverTooltip, or SLDSIcon.

Here is an example for building a tooltip over an info icon:

```
Note: the SLDSPopoverTooltip requires a focusable element as a child (ie. either a button or anchor) so that keyboard users can navigate to it.

<SLDSPopoverTooltip
  align="top"
  content={<span>Here is more information.</span>}>
    <a href="javascript:void(0)">
      <SLDSIcon assistiveText="More Info" category="utility" name="info" className="slds-icon-text-default" />
    </a>
</SLDSPopoverTooltip>
```

## FAQ
Read our [FAQ](https://react.lightningdesignsystem.com/faq/) on the documentation site.

## Contributing to the code base

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) first. If you'd like to meet or discuss this project, please contact @interactivellama, so you can be invited to the Slack channel and/or the weekly Cross-Cloud Office Hours.

## Licenses

* Source code is licensed under [BSD License Clause 2](http://opensource.org/licenses/BSD-2-Clause)
* All icons and images are licensed under [Creative Commons Attribution-NoDerivatives 4.0](http://creativecommons.org/licenses/by-nd/4.0/)
* The font is licensed under our [font license](https://www.lightningdesignsystem.com/assets/licenses/License-for-font.txt)

## Got feedback?

Please create a [GitHub Issue](https://github.com/salesforce-ux/design-system-react/issues)
