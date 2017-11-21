# Usage with Webpack

Design System React has a peerDependency on [Lightning Design System (LDS)](https://github.com/salesforce-ux/design-system). `Design System React` has kept this as a peer dependency for giving flexibility for developers to choose the different versions of LDS.

If you are planning to use `Design System React` in a standalone application you need to bring in the stylesheets provided by `Lightning Design System (LDS)`.

## Option 1: Include stylesheet directly

The classic way to do this is [download](https://www.lightningdesignsystem.com/downloads) the LDS stylesheets and serve it up in your `public` static assets folder and include the stylesheet using

```
<link rel="stylesheet" href="your/public/assets/salesforce-lightning-design-system.min.css">
```

This has a disadvantage of maintaining the versions later.

## Option 2: Import CSS using style-loader

These are the relevant portions of the changes you will need to do in order to wire up `Design System React` in a standalone application.

#### package.json

```
  "scripts": {
     ...,
    "postinstall": "bash postinstall.sh",
    "build": "webpack",
    ...
  },
 "devDependencies": {
    ...,
    "@salesforce-ux/design-system": "^2.4.5",
    "design-system-react": "git+ssh://git@github.com:salesforce/design-system-react.git#v0.7.3",
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

#### postinstall.sh

Create symlinks from node_modules to your public folder

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
import IconSettings from 'design-system-react/components/icon-settings';
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
