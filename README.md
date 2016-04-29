### Salesforce Design System: Interactive accessible components for React

[![Build Status](https://travis-ci.com/salesforce-ux/design-system-react.svg?token=BMXxPFKR5GZuYsqAFsEf&branch=master)](https://travis-ci.com/salesforce-ux/design-system-react)

## Overview
The Design System React library is the Reactjs implementation of the <a href="http://www.lightningdesignsystem.com/">Lightning Design System</a>.
Each Design System React component is a specific variant of a component from Lightning Design System.
For example, <code>SLDSMenuDropdown</code> represents <a href="http://www.lightningdesignsystem.com/components/menus/#dropdown">Lightning Design System Menu > Dropdown</a>,
and <code>SLDSLookup</code> represents <a href="http://www.lightningdesignsystem.com/components/lookups/#base">Lightning Design System Lookup > Base</a>.


This project is in beta and very experimental. Please visit [Design System React](http://salesforce-ux.github.io/design-system-react) for documentation and examples of using the Design System React Components. If you are using the ECMAScript 6 source files in `./components/`, you will need to enable your ES5 transpiler to allow stage-1 proposed features. If you are using Babel, it may be helpful to install the NPM module, `babel-preset-stage-1`, into your project and review the `.babelrc` file in this project.

## Components

* <a href="https://design-system-react.herokuapp.com/#/button">Button</a>
* <a href="https://design-system-react.herokuapp.com/#/button-group">ButtonGroup</a>
* <a href="https://design-system-react.herokuapp.com/#/button-stateful">ButtonStateful</a>
* <a href="https://design-system-react.herokuapp.com/#/data-table">DataTable</a>
* <a href="https://design-system-react.herokuapp.com/#/dateinput">DatePickerSingleSelect</a>
* <a href="https://design-system-react.herokuapp.com/#/icon">Icon</a>
* <a href="https://design-system-react.herokuapp.com/#/lookup">Lookup</a>
* <a href="https://design-system-react.herokuapp.com/#/dropdown">MenuDropdown</a>
* <a href="https://design-system-react.herokuapp.com/#/picklist">MenuPicklist</a>
* <a href="https://design-system-react.herokuapp.com/#/modal">Modal</a>
* <a href="https://design-system-react.herokuapp.com/#/notification">Notification</a>
* <a href="https://design-system-react.herokuapp.com/#/tooltip">PopoverTooltip</a>
* <a href="https://design-system-react.herokuapp.com/#/timepicker">Timepicker</a>

### Run local server

```
npm install
npm start
open http://localhost:3000
```

### Run tests

```
npm test
```

### Run Build

```
npm install
npm run compile
npm run pages
```


## Getting Started

Note: design-system-react is optimized for react0.14.x and uses Lightning Design System 1.0.0.

### NPM

First, install the npm module:

```
npm install --save design-system-react
```

Then, in your React code, refer to each Lightning Design System component using the "SLDS" prefix, e.g. SLDSPopoverTooltip.

For example to import the Tooltip and Icon components:

```
import {SLDSPopoverTooltip, SLDSIcon} from 'design-system-react';
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
1.  **What is the <a href="http://www.lightningdesignsystem.com/">Lightning Design System</a>?**

    It is collection of design patterns, components, and guidelines for creating unified UI in the Salesforce ecosystem.

2.  **How is the Design System React Library different than the Lightning Design System?**

    The Lightning Design System consists of static markup components. The Design System React Library is the ReactJS implementation.

3.  **Are the Design System React components accessible?**

    We strive to make all components accessible for keyboard users and screen readers. If you find any accessibility bugs, please submit a <a href="https://github.com/salesforce-ux/design-system-react/issues">Github Issue</a>.

4.  **Which version of React and Lightning Design System do you support?**

    Design System React is optimized for react0.14.x and uses Lightning Design System 1.0.0.

5.  **Which browsers are supported?**

    We support the same browsers as the Lightning Design System. Please visit <a href="http://www.lightningdesignsystem.com/faq/#what-browsers-are-supported">Lightning Design System - FAQ</a> for details.


## Contributing to the code base

Please read the <a href="CONTRIBUTING.md">CONTRIBUTING.md</a> first.

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## Licenses

* Source code is licensed under [BSD License Clause 2](http://opensource.org/licenses/BSD-2-Clause)
* All icons and images are licensed under [Creative Commons Attribution-NoDerivatives 4.0](http://creativecommons.org/licenses/by-nd/4.0/)
* The font is licensed under our [font license](https://www.lightningdesignsystem.com/assets/licenses/License-for-font.txt)


## Got feedback?

Please create a <a href="https://github.com/salesforce-ux/design-system-react/issues">GitHub Issue</a>
