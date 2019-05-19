# Create React App 2x
Bootstrap React App with create-react-app 2x and Salesforce Lightning Design System (SLDS) without ejecting the webpack config


## Resources:
- https://reactjs.org/docs/create-a-new-react-app.html
- https://react.lightningdesignsystem.com/
- https://www.lightningdesignsystem.com/


## Sample Repo
Follow this repo at https://github.com/synle/create-react-app-salesforce-lightning to view a fully functional create-react-app 2x with Salesforce Lightning Design System


## Requirements
Make sure you have node js version >=8. You can have it installed using `nvm`, `n` or just binary from your OS of choice


## How to run this demo app
```
npm install
npm start
```


## Step-by-step instruction
### Bootstrap the app
```
npx create-react-app my-app
cd my-app
npm start
```

### Override create-react-app webpack config
By default, create-react-app hides the webpack config from us, we need to use a package called `rewire` to modify the webpack config to properly install salesforce lightning

More on that here: https://github.com/timarney/react-app-rewired
```
npm install react-app-rewired --save-dev
```

Then changes the package.json scripts to use `react-app-rewired`
```
/* package.json */

"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test --env=jsdom",
}
```


### Customize the `config-overrides.js` for webpack
Create a new file called `config-overrides.js` with the following content
```
const path = require('path');

module.exports = function override(config, env) {
  config.module.rules = [
    // salesforce dependencies
    // this will compile salesforce lightning as src, not as package
    {
        test: /\.jsx?$/,
        include: [
          'node_modules/@salesforce/design-system-react',
        ].map(
          someDir => path.resolve(
            process.cwd(),
            someDir
          )
        ),
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            "react-app"
          ],
        },
    },
  ].concat(config.module.rules);

  return config;
}
```


### Add salesforce lightning
```
npm install --save @salesforce-ux/design-system @salesforce/design-system-react
```

### Copy over Salesforce Lightning static asset
Follow the instruction from Salesforce lightning website at https://github.com/salesforce/design-system-react/blob/master/docs/create-react-app.md

Overall, you need to copy the following items: CSS, Fonts, and icon SVGs
#### Salesforce Lightning CSS
```
cp node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css public/
```

#### Salesforce Lightning Fonts
```
cp -r node_modules/@salesforce-ux/design-system/assets/fonts public/
```

#### Salesforce Lightning Icon SVGs
Note that here I copy the icons into `public/assets` instead of `public` as in the original guide from Salesforce Repo. The reason for this is that most code samples from the SLDS page reference the icon path from `assets/icons`.
```
mkdir -p public/assets
cp -r node_modules/@salesforce-ux/design-system/assets/icons public/assets
```


#### Salesforce Lightning Images / Illustrations
This is optional. But if you are using Salesforce Illustrations, make sure you copy over the illustrations files from Salesforce module
```
mkdir -p public/assets
cp -r node_modules/\@salesforce/design-system-react/assets/images public/assets/
```


### Modify index.html to include Salesforce css
Add the following to your `head` tag
```
<link rel="stylesheet" type="text/css" href="/salesforce-lightning-design-system.min.css">
```


### Change Salesforce IconSettings
In your index.js (root / entry point file) to set the path to Salesforce Icon. Just wrap it where you would normally mount your app.
```
import IconSettings from '@salesforce/design-system-react/components/icon-settings';


<IconSettings iconPath="/icons">
...
</IconSettings>
```


### Explore and Use Salesforce component
Visit this link to start using Salesforce Lightning Design Components https://react.lightningdesignsystem.com/components
