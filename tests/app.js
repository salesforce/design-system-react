const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.test');

const port = 8001;
const app = express();
const compiler = webpack(webpackConfig);

// // Use the webpack dev middleware for development
app.use(
	webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath,
	})
);

app.use(
	webpackHotMiddleware(compiler, {
		log: console.log,
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000,
	})
);

// Provide access to Design System CSS
app.use(
	'/assets',
	express.static(
		path.join(__dirname, '../node_modules/@salesforce-ux/design-system/assets')
	)
);
app.use(
	'/assets/icons',
	express.static(
		path.join(
			__dirname,
			'../node_modules/@salesforce-ux/design-system/assets/icons'
		)
	)
);

// Provide access to node_modules for JS libraries
app.use(
	'/node_modules',
	express.static(path.join(__dirname, '../node_modules'))
);

// Needed for in browser testing
app.use(express.static(path.join(__dirname, '../tests')));
app.use('/base/node_modules', express.static(`${__dirname}/node_modules`));

const server = app.listen(port, () => {
	console.log(
		`In-browser unit test server listening on port ${server.address().port}`
	);
});
