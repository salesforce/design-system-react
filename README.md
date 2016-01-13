design-system-react
=====================

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
* SLDSTooltip


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

Note: design-system-react is currently optimized for React 0.14.x.

To use it in your code base, follow these steps.

First, install the npm module:

```
npm install --save design-system-react
```

Then, in your React code, refer to each Lightning Design System component using the "SLDS" prefix, e.g. SLDSTooltip.

For example to import the Tooltip and Icon components:

```
import {SLDSTooltip, SLDSIcon} from 'design-system-react';
```

You can then use the components in your JSX markup, e.g. SLDSTooltip, or SLDSIcon.

Here is an example media object using SLDSIcon:

```
  <div className="slds-media slds-media-center">
    <div className="slds-media__figure">
      <SLDSIcon assistiveText=""
          category="utility"
          className="slds-icon-text-default"
          name="like"
          size="small" />
    </div>
    <div className="slds-media__body">
      <h2 className="slds-text-heading--small slds-truncate">Card Header (2)</h2>
    </div>
  </div>
```

Have fun!



## Contributing to the code base

See <a href="CONTRIBUTING.md">CONTRIBUTING.md</a>

## Licenses

* Source code is licensed under [BSD License Clause 2](http://opensource.org/licenses/BSD-2-Clause)
* All icons and images are licensed under [Creative Commons Attribution-NoDerivatives 4.0](http://creativecommons.org/licenses/by-nd/4.0/)
* The font is licensed under our [font license](https://www.lightningdesignsystem.com/assets/licenses/License-for-font.txt)

## Got feedback?

Please create a <a href="https://github.com/salesforce-ux/design-system-react/issues">GitHub Issue</a>

