# Design System for React
### Accessible, localization-friendly, presentational React components

[![Build Status](https://travis-ci.com/salesforce/design-system-react.svg?token=erkizBStRxre5p3S1xij&branch=master)](https://travis-ci.com/salesforce/design-system-react)

## Overview
Welcome to the project! :wave: This library is the [React](https://facebook.github.io/react/) implementation of the [Salesforce Lightning Design System](https://www.lightningdesignsystem.com/).

* [Getting Started](https://react.lightningdesignsystem.com/getting-started/) (Salesforce Employees)
* [Documentation and examples](https://react.lightningdesignsystem.com/) (Salesforce Employees)
* [Component Best Practices](CONTRIBUTING.md#concepts-and-best-practices)
* [FAQ](https://react.lightningdesignsystem.com/faq/) (Salesforce Employees)

#### ECMAScript 6 and CommonJS modules

It is highly recommended that you `npm install` the `-es` suffixed tag and import individual components. You will need a [stage-1 and higher proposed features](https://babeljs.io/docs/plugins/preset-stage-1/) transpiler ([stage-1 Babel preset](https://www.npmjs.com/package/babel-preset-stage-1) or review our `.babelrc`). The non-suffixed package is a [CommonJS](https://nodejs.org/docs/latest/api/modules.html) build.

### Local development Storybook and in-browser test server

```
npm install
npm start
open http://localhost:9001 http://localhost:8001
```

## Getting Started

`design-system-react` is compatible with React >=15.4.1 <16 and may work with React 16. This library and it's markup will be updated to the next version of SLDS styles at release freeze. You can find the current SLDS version, a [getting started](https://react.lightningdesignsystem.com/getting-started/) and a [Concepts and Best Practices](https://react.lightningdesignsystem.com/contributing/#concepts-and-best-practices) guide on the documentation site.

### SLDS Icons

Prior to v0.7.0, SLDS icons were inlined and just worked. Now you will need to host the icons and set a path `context` for all child components with `<IconSettings>`:

```
import IconSettings from 'design-system-react/components/icon-settings';

ReactDOM.render(
	<IconSettings iconPath="/assets/icons">
		<MyApp />
	</IconSettings>,
	document.getElementById('app')
	)
```

### Example

Add the following line to your `package.json` devDependencies and run `npm install`.

```
# package.json

"design-system-react": "git+ssh://git@github.com:salesforce/design-system-react.git#v[VERSION]",
```

The bundled files are provided only for convenience. 

* `design-system-react.min.js` (700KB+) - includes icons in the JavaScript
* `design-system-react-components.min.js` (~400KB) - no icons.

Import and use only the components you need:

```
import Tooltip from 'design-system-react/components/popover-tooltip';
import Icon from 'design-system-react/components/icon';
import IconSettings from 'design-system-react/components/icon-settings';

<IconSettings iconPath="/assets/icons">
  <Tooltip
    align="top"
    content={<span>Here is more information.</span>}
  >
    <a href="javascript:void(0)">
      <Icon assistiveText="More Info" category="utility" name="info" className="slds-icon-text-default" />
    </a>
  </Tooltip>
</IconSettings>
```

## Contributing to the code base

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) and [Test README](/tests/README.md) first. Then, creact an issue to tell others you are working on a bug. If you would like to contribute a new component, create an issue with a list of proposed props to discuss with maintainers.  

## Licenses

* Source code is licensed under [BSD 3-Clause](https://git.io/sfdc-license)
* All icons and images are licensed under [Creative Commons Attribution-NoDerivatives 4.0](https://github.com/salesforce/licenses/blob/master/LICENSE-icons-images.txt)
* The Salesforce Sans font is licensed under our [font license](https://github.com/salesforce/licenses/blob/master/LICENSE-font.txt)

## Got feedback?

Create an [issue](https://github.com/salesforce/design-system-react/issues) for bugs. Support questions should be asked on [StackOverflow](https://stackoverflow.com/).
