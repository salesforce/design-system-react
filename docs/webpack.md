# Usage with Webpack

Design System React has a peerDependency on [Salesforce Lightning Design System (SLDS)](https://github.com/salesforce-ux/design-system). Design System React has kept this as a peer dependency for giving flexibility for developers to choose different versions of SLDS.

If you are planning to use Design System React in a standalone application you need to bring in the stylesheets provided by SLDS.

## Option 1: Include stylesheet directly

The classic way to do this is [download](https://www.lightningdesignsystem.com/downloads) the SLDS stylesheets and serve it up in your `public` static assets folder and include the stylesheet:

```
<link rel="stylesheet" href="your/public/assets/salesforce-lightning-design-system.min.css">
```

This has a disadvantage of maintaining the versions later.

## Option 2: Import CSS using Webpack style-loader

These are the relevant portions of the changes you will need to do in order to wire up Design System React in a standalone application.

#### package.json

```
  "scripts": {
     ...,
    "postinstall": "node postinstall.js",
    "build": "webpack",
    ...
  },
 "devDependencies": {
    ...,
    "@salesforce-ux/design-system": "^[VERSION]",
    "design-system-react": "git+ssh://git@github.com:salesforce/design-system-react.git#v[VERSION]",
    "fs-extra": "^4.0.2",
    "style-loader": "^0.18.2",
    "webpack": "^3.8.1",
    ...
  },
```

#### webpack.config.js

```
    ...
    module: {
        rules: [
            ...,
            {
                test: /\.min\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'your/desired/output/path/'
                    // Serve this up using your static web server
                }
            },
            ...
        ]
    }
    ...
```

#### postinstall.js

Create symlinks from `node_modules` to your public folder in order to serve static assets

```
// Code to run post npm install

const path = require('path');
const fs = require('fs-extra');

const directories = [
    'fonts',
    'icons',
    'images',
    'styles'
];

// Create symlinks from node_modules -> /your/public/folder/

directories.forEach((folderName) => {
    const srcPath = path.resolve(__dirname, `../node_modules/@salesforce-ux/design-system/assets/${folderName}`);

    // Choose the target path based on your project
    // Serve this up using your static web server
    const targetPath = path.resolve(__dirname, `public/css/lds/${folderName}`);

    fs.ensureSymlinkSync(srcPath, targetPath);
});
```

#### App.jsx

```
import React, { Component } from 'react';

import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
...
...

class App extends Component {
    render() {
        return (
            <IconSettings iconPath="public/css/lds/icons">
                <YourApp />
            </IconSettings>
        );
    }
}

export default App;
```
