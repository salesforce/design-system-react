# Getting Started

## Project Overview

Design System React is the React implementation of the [Lightning Design System](http://www.lightningdesignsystem.com/) where each Design System React component is a specific variant of a component from Lightning Design System.

For example, [Menu Dropdown](components/menu-dropdown) represents [Lightning Design System Menu > Dropdown](http://www.lightningdesignsystem.com/components/menus/#dropdown), and [Lookup](/components/lookup) represents [Lightning Design System Lookup > Base](http://www.lightningdesignsystem.com/components/lookups/#base).

If you are new to React or an application state container like Redux, please review the tips and tutorials on the [Resources](/resources) page along with the Concepts and Best Practices section of the [Contributing](/contributing) page.

The easiest way to get started with Design System React is to click through to any of our [examples](/components) where you can play with it live.

_Note_: Design System React is currently optimized for React ${reactVersion} and Lightning Design System ${sldsVersion}.

## Office Hours

Core maintainers are available at [Office Hours](https://plus.google.com/hangouts/_/salesforce.com/react) on Tuesdays, 4pm EST / 1pm PST to talk through any issues you are having.

## Installation with npm

Design System React is available via npm as a [tagged git remote url](https://docs.npmjs.com/cli/install) on GitHub. The current release is version ${dsrVersion}. You will need access to the [private design-system-react repos](https://github.com/salesforce-ux/design-system-react/releases) in order to install it. You can [request access](https://docs.google.com/a/salesforce.com/forms/d/1J0-FEuNaC_pRxCRTPWBcq5bWyr7gh87NQoebdCPySXM/viewform) if you don't have it. Also, if this is your first time accessing a private repo on GitHub you will need to ensure that you have [configured your SSH keys](https://help.github.com/articles/generating-an-ssh-key/).

When you’re ready to install you have the choice of using either ES2015 or CommonJS modules. If your project, like most React projects, is already using Babel, the ES2015 modules are likely to be your best bet.

### ES2015

```shell
$ npm install --save git+ssh://git@github.com/salesforce-ux/design-system-react.git#v${dsrVersion}-es
```

### CommonJS

```shell
$ npm install --save git+ssh://git@github.com/salesforce-ux/design-system-react.git#v${dsrVersion}
```

## Usage

We recommend using Design System React with Webpack, though any ES2015-module or CommonJS-compliant module system should work, but has not been tested. When using Webpack, you have the choice of using either ES2015 or CommonJS syntax.

Regardless of which syntax you use to import the components, the standard way to use them is via [jsx](https://facebook.github.io/react/docs/jsx-in-depth.html). For this and all future examples we’ll be using the Button component, but the pattern is the same no matter which component you are trying to use.

```jsx
<Button label="Hello World!" onClick={this.handleClick} />
```


### ES2015

```jsx
import Button from 'design-system-react/components/button';
```

If you’re using this syntax with the es-tagged version of Design System React (and we’d recommend that you do) you’ll also need to make sure that you have properly configured Babel to compile the ES2015 and React code found in the components along with the rest of your app.

Design System React uses the following presets, usually found in your [.babelrc](https://babeljs.io/docs/usage/babelrc/):

```jsx
"presets": ["es2015", "stage-1", "react"]
```

Assuming you’re using the [babel loader for Webpack](https://github.com/babel/babel-loader), you’ll also want to tell the loader to go ahead and include the design-system-react folders in node_modules. Instead of excluding all of node_modules, which some tutorials have you do, we’d recommend explicitly including each directory where you have ES2015 code that you want Babel to process. Something like:

```jsx
loaders: [{
	test: /\.jsx?$/,
	loader: 'babel',
	include: [
		path.join(__dirname, 'src'),
		path.join(__dirname, 'node_modules/design-system-react')
	]
}]
```

You can see a working example of this and more in our [boilerplate app](https://github.com/salesforce-ux/design-system-react-app-boilerplate).

### CommonJS

```jsx
var SLDSButton = require('design-system-react/components/button');
```

This assumes that your tool of choice knows to look in node_modules for client-side modules. For Webpack, Browserify, and other modern module systems this is the default behavior. As an aside, if you’re going to use CommonJS syntax to include the components in your project you should probably be using the CommonJS version of Design System React. If you’re not, you’ll need to read through the additional ES2015 instructions above.

## CDN / Bundle

A [bundled version of Design System React](https://github.com/salesforce-ux/design-system-react/archive/v${dsrVersion}.zip) is available for download, but is not the recommended method for including the components in a project and should only be used for quick prototyping efforts. The React libraries are not bundled with Design System React. You will first need to [download or link to the Facebook CDN](https://facebook.github.io/react/downloads.html) in order to set up React in your project.

## Have fun!

If you have any questions (and we hope you do!) please let us know via our [GitHub Issues](https://github.com/salesforce-ux/design-system-react/issues). You can also talk to core maintainers at [Office Hours](https://plus.google.com/hangouts/_/salesforce.com/react) on Tuesdays, 4pm EST / 1pm PST.
