var server = require('auth-static');

server({
	options: {
		gzip: true
	},
	node_env: process.env.NODE_ENV,
	username: process.env.AUTH_USERNAME,
	password: process.env.AUTH_PASSWORD,
	root: './storybook',
	port: 9001
});
