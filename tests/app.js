const { spawn } = require('child_process');
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
		publicPath: webpackConfig.output.publicPath
	})
);

app.use(
	webpackHotMiddleware(compiler, {
		log: console.log,
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000
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

const storybookApp = express();
storybookApp.use(express.static(`${__dirname}/../storybook`));

const storybookServer = storybookApp.listen(9002, () => {
	const storybookPort = storybookServer.address().port;
	console.log('storybookApp listening at port %s', storybookPort);

	process.stdout.write('\n');
	process.stdout.write('npm run snapshot-test');
	const storybookTest = spawn('npm', ['run', 'snapshot-test']);

	storybookTest.stdout.on('data', (stream) => {
		process.stdout.write(`\n${stream}`);
	});

	storybookTest.stderr.on('data', (errData) => {
		const errString = `${errData}`;
		process.stdout.write(`\n${errString}`);
	});

	storybookTest.on('close', (code) => {
		process.stdout.write(`storybookTest process exited with code ${code}`);
		storybookServer.close();
	});
});
