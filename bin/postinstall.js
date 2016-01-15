if (process.env.NPM_CONFIG_PRODUCTION === 'false') {
	var spawn = require('child_process').spawn;

	var _ = require('underscore'); // for some utility goodness
	var deploySh = spawn('sh', [ './bin/heroku-build.sh' ], {});

	deploySh.stdout.on('data', function (data) {
		console.log(data.toString());
	});
}