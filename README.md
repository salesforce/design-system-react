design-system-react
=====================

[![Build Status](https://travis-ci.com/salesforce-ux/design-system-react.svg?token=BMXxPFKR5GZuYsqAFsEf&branch=master)](https://travis-ci.com/salesforce-ux/design-system-react)

SLDS React component library based off [Salesforce Lightning Design System](http://www.lightningdesignsystem.com). This project is in beta, very experimental, and not yet open-sourced. Until this project is open-sourced, documentation for using the SLDS React Components runs locally from this repo. Inside your local directory, run `npm start` and open `localhost:3000` to view docs.

## Components

* SLDSButton
* SLDSButtonGroup
* SLDSDropdown
* SLDSIcon
* SLDSLookup
* SLDSModal
* SLDSNotification
* SLDSPicklist
* SLDSPopoverTooltip


## Run local server

```
npm install
npm start
open http://localhost:3000
```

## Run tests

```
npm test
```

## Run Build

```
npm install
npm run pages
```

## Using the React components

Note: design-system-react is optimized for React 0.14.x.

To use it in your code base, you have a couple of options.


### Option 1: NPM

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

<div ref="tooltipDemoExample">
  <SLDSPopoverTooltip>
    'align="top"
    'content={<span>Here is more information.</span>}
    'targetElement={this.refs.tooltipDemoExample}>
      <a href="javascript:void(0)">
        <SLDSIcon assistiveText="More Info" category="utility" name="info" className="slds-icon-text-default" />
      </a>
  </SLDSPopoverTooltip>
</div>
```


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

