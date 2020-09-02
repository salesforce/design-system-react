# Create React App

The following tasks will help you get started using Design System React within Create React App 1.x. If you are using Create React App 2.x, please follow this instruction link https://github.com/salesforce/design-system-react/blob/master/docs/create-react-app-2x.md

Do you have tips to share with other Create React Users users? Please share with the rest of the Create React community and add to the list below.

## Getting Started

1. Create a new app
    * `create-react-app my-react-app`
1. Install NPM modules
    * `cd my-react-app && npm install @salesforce-ux/design-system @salesforce/design-system-react`
1. Copy SLDS CSS file to `public` folder
    * `cp node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css public/`
1. Copy SLDS icons folder to `public` folder
    * `cp -r node_modules/@salesforce-ux/design-system/assets/icons public/`
1. Copy SLDS fonts folder to `public` folder
    * `cp -r node_modules/@salesforce-ux/design-system/assets/fonts public/`
1. Add CSS file to `index.html`
    * `<link rel="stylesheet" type="text/css" href="/salesforce-lightning-design-system.min.css">`
1. Copy examples from [Design System React website](https://react.lightningdesignsystem.com/) into `app.js`.
1. Update imports to named imports (CommonJS build) of Design System React.
    * `import { Button, IconSettings } from '@salesforce/design-system-react';`
1. Modify the `iconPath` prop of `IconSettings` to output the correct path to the icons in the public folder.
    * `<IconSettings iconPath="/icons">{// doc site examples}</IconSettings>`
