/* eslint-disable consistent-return */
const auth = require('basic-auth');
const compression = require('compression');
const express = require('express');

const port = process.env.PORT || 9001;

// Create server
const app = express();

if (process.env.NODE_ENV === 'production') {
	// Authentication
	app.use((req, res, next) => {
		const user = auth(req);
		const username = process.env.AUTH_USERNAME;
		const password = process.env.AUTH_PASSWORD;

		const unauthorized = function () {
			res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
			res.sendStatus(401);
		};

		if (!username || !password) {
			return unauthorized();
		}	else if (!user || user.name !== username || user.pass !== password) {
			return unauthorized();
		}

		next();
	});
}

// Compress all files
app.use(compression());

// Static directory
app.use(express.static(`${__dirname}/storybook`));

// Listen
const server = app.listen(port, () => {
	console.log('Server listening on port ', server.address().port);
});
