module.exports = function (grunt) {
	require('./scripts/helpers/setup');
	grunt.loadTasks('tasks');

	// Look in ./tasks for additional task modules
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	const defaultPort = 8080;

	const excludePatternGeneratedTestFiles = [
		'!test/tests.js',
		'!test/tests-api.js',
		'!test/tests-compiled.js'
	];

	const defaultWatchFiles = ['Gruntfile.js', 'tasks/**/*.*', 'src/**/*.*', 'sample-data/**/*.*', 'test/**/*.*'];

	grunt.initConfig({
		port: grunt.option('port') || process.env.PORT || defaultPort,
		excludePatternGeneratedTestFiles: excludePatternGeneratedTestFiles,
		'eslint': {
			target: [
				'Gruntfile.js',
				'src/**/*.js',
				'tasks/**/*.js',
				'test/**/*.js',
				'!test/compat/*.js'
			].concat(excludePatternGeneratedTestFiles)
		},
		'mocha': {
			main: {
				options: {
					urls: ['http://localhost:<%= port %>/test/index.html'],
					run: true,
					log: true,
					reporter: 'Dot'
				}
			}
		},
		'watch': {
			tests: {
				files: defaultWatchFiles.concat(excludePatternGeneratedTestFiles),
				tasks: ['eslint', 'compileTests', 'compileTestsApi']
			}
		},
		'connect': {
			server: {
				options: {
					hostname: '*',
					base: [
						'public',
						'./examples',
						'./fonts',
						'./node_modules',
						'.'
					],
					port: '<%= port %>',
					useAvailablePort: true,
					onCreateServer: function (server) {
						server.on('listening', function () {
							grunt.config('port', server.address().port);
						});
					}
				}
			}
		},
		'shell': {
			docco: {
				command: './scripts/generate-docs.sh'
			}
		},
		'webpack': {
			options: require('./webpack.dist.config'),
			build: {}
		},
		'webpack-dev-server': {
			start: {
				webpack: require('./webpack.config'),
				publicPath: '/build/',
				contentBase: './public',
				port: '<%= port %>',
				keepAlive: true,
				hot: true,
				quiet: false
			}
		}
	});

	grunt.registerTask('default', ['shell:docco', 'compileTests', 'compileTestsApi']);
	grunt.registerTask('build', ['webpack']);
	grunt.registerTask('serve', 'Runs webpack with hot module swapping', ['default', 'webpack-dev-server:start']);
	grunt.registerTask('serve-watch', 'For concurrent watch task / webpack watch (use in new window)', ['default', 'watch:tests']);
	grunt.registerTask('test', ['default', 'webpack', 'connect', 'mocha']);
};
