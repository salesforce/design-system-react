/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const compression = require('compression');
const express = require('express');

const port = process.env.PORT || 9001;

// Create server
const app = express();

// Compress all files
app.use(compression());

// Static directories
app.use(
	'/assets',
	express.static(
		`${__dirname}/node_modules/@salesforce-ux/design-system/assets/`,
	),
);
app.use(express.static(`${__dirname}/storybook`));

// Listen
const server = app.listen(port, () => {
	console.log('Server listening on port ', server.address().port);
});
