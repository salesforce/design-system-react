# Create React App

The following tasks will help you get started using Design System React within Create React App 1.x.

## Getting Started

1. Create a new app
    * `create-react-app my-react-app`
1. Install NPM modules
    * `npm install @salesforce-ux/design-system @salesforce/design-system-react`
1. Copy SLDS CSS file to `public` folder
    * `/node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css`
1. Copy SLDS icons folder to `public` folder
    * `/node_modules/@salesforce-ux/design-system/assets/icons`
1. Copy SLDS fonts folder to `public` folder
    * `/node_modules/@salesforce-ux/design-system/assets/fonts`
1. Add CSS file to `index.html`
    * `<link rel="stylesheet" type="text/css" href="/salesforce-lightning-design-system.min.css">`
1. Copy examples from [Design System React website](https://react.lightningdesignsystem.com/) into `app.js`.
1. Update imports to named imports (CommonJS build) of Design System React.
    * `import { Button, IconSettings } from '@salesforce/design-system-react';`
1. Modify the `iconPath` prop of `IconSettings` to output the correct path to the icons in the public folder.
    * `<IconSettings iconPath="/icons">{// doc site examples}</IconSettings>`
