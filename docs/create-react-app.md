# Create React App

The following tasks will help you get started using Design System React within Create React App 1.x.

## Getting Started

* Create a new app
    * `create-react-app my-react-app`
* Copy SLDS CSS file to `public` folder
    * `/node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css`
* Copy SLDS icons folder to `public` folder
    * `/node_modules/@salesforce-ux/design-system/assets/icons`
* Add CSS file to `index.html`
    * `<link rel="stylesheet" type="text/css" href="/salesforce-lightning-design-system.min.css">`
* Copy examples from [Design System React website](https://react.lightningdesignsystem.com/) into `app.js`.
* Update imports to named imports (CommonJS build) of Design System React.
    * `import { Button, IconSettings } from '@salesforce/design-system-react';`
* Modify the `iconPath` prop of `IconSettings` to output the correct path to the icons in the public folder.
    * `<IconSettings iconPath="/icons">{// doc site examples}</IconSettings>`
