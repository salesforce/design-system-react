/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const compression = require('compression');
const express = require('express');
const minimist = require('minimist');

const port = process.env.PORT || 9001;
const argv = minimist(process.argv.slice(2));
const buildFolder = argv.folder || 'storybook';
// Setting buildFolder to 'storybook-based-tests' will allow interactive viewing of the Storyshots (story based tests).

// Create server
const app = express();

// Compress all files
app.use(compression());

// Static directories
app.use(
	'/assets',
	express.static(
		`${__dirname}/node_modules/@salesforce-ux/design-system/assets/`
	)
);
app.use(express.static(`${__dirname}/${buildFolder}`));

// Listen
const server = app.listen(port, () => {
	console.log('Server listening on port ', server.address().port);
});
