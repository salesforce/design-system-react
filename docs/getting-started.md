# Getting Started

## Install

```
$ npm install @salesforce-ux/design-system @salesforce/design-system-react
```

## Project Overview

Design System React is an implementation of the [Lightning Design System](http://www.lightningdesignsystem.com/) where each Design System React component is a specific variant of a component from Lightning Design System. For example, [Combobox](components/comboboxes) represents [Lightning Design System Menu > Dropdown](http://www.lightningdesignsystem.com/components/combobox).

If you are new to React or an application state container like Redux, please review the tips and tutorials on the [Resources](/resources/) page along with the Concepts and Best Practices section of the [Contributing](/contributing/) page.

The easiest way to get started with Design System React is to click through to any of our [examples](/components) where you can play with it live.

Design System React is currently optimized for React ${reactVersion} and Lightning Design System ${sldsVersion}.

### Quick Setup (CommonJS)

A CommonJS-compatible version has been included within the NPM package to allows usage without transpiling. Use the following named `import` syntax to access CommonJS components from `/lib/index.js`:

```
import { Button } from '@salesforce/design-system-react';

<Button label="Hello Button" />
```

### Recommended Usage (ES6 modules)

Recommended usage requires that your babel presets are set up correctly. `create-react-app` and environments that do not transpile code within `node_modules` are not compatible with the component import below. All the examples on the [documentation site](https://react.lightningdesignsystem.com/) use this syntax. You can use the Babel preset, `@salesforce/babel-preset-design-system-react`, to get started. [This preset](https://npmjs.com/package/@salesforce/babel-preset-design-system-react) will keep Babel compatible with Design System React and allow ES6 module benefits such as tree-shaking.

```
import Button from '@salesforce/design-system-react/components/button';

<Button label="Hello Button" />
```

#### Transpile with `.babelrc` settings

```json
{
  "presets": ["@salesforce/babel-preset-design-system-react"]
}
```

Assuming you’re using the [babel loader for Webpack](https://github.com/babel/babel-loader), you’ll also want to tell the loader to go ahead and include the design-system-react folders in `node_modules`. Instead of excluding all of node_modules, which some tutorials have you do, we’d recommend explicitly including each directory where you have ES2015 code that you want Babel to process. Something like the following **Webpack v1** file:

```js
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		bundle: './public/src/index.js'
	},
	resolve: {
		extensions: [
			'',
			'.js',
			'.jsx'
		]
	},
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel'],
				include: [
					path.join(__dirname, 'public/src'),
					path.join(__dirname, 'node_modules/@salesforce/design-system-react'),
				]
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?url=false&outputStyle=expanded&sourceMap=true&sourceMapContents=true'
				)
			},
			{
				test: /\.(svg|gif|jpe?g|png)$/,
				loader: 'url-loader?limit=10000'
			},
			{
				test: /\.(eot|woff|woff2|ttf)$/,
				loader: 'url-loader?limit=30&name=assets/fonts/webfonts/[name].[ext]'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify('production') }
		}),
		new ExtractTextPlugin('[name].css')
	]
};```

## CDN / Bundle

A [bundled version of Design System React](https://github.com/salesforce/design-system-react/archive/v${dsrVersion}.zip) is available for download, but is not the recommended method for including the components in a project and should only be used for quick prototyping efforts.

## Have fun!

If you have support questions, please post a question to [StackOverflow](https://stackoverflow.com/questions/tagged/design-system-react) and tag with `design-system-react`. If you find any bugs, create a [GitHub Issue](https://github.com/salesforce/design-system-react/issues).
