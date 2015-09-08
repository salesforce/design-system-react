module.exports = function (grunt) {
	grunt.loadTasks('tasks');

	const defaultPort = 8080;

	const excludePatternGeneratedTestFiles = [
		'!test/tests.js',
		'!test/tests-api.js',
		'!test/tests-compiled.js'
	];

	grunt.initConfig({
		babel: {
			options: {
				modules: 'umd'
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.js'],
					dest: 'dist/'
				}]
			}
		},
		port: defaultPort,
		excludePatternGeneratedTestFiles: excludePatternGeneratedTestFiles,
		eslint: {
			target: [
				'Gruntfile.js',
				'src/**/*.js',
				'tasks/**/*.js',
				'test/**/*.js'
			].concat(excludePatternGeneratedTestFiles)
		},
		mocha: {
			main: {
				options: {
					urls: ['http://localhost:<%= port %>/test/index.html'],
					run: true,
					log: true,
					reporter: 'Nyan'
				}
			}
		},
		watch: {
			eslint: {
				files: ['src/**/*.*', 'sample-data/**/*.*', 'test/**/*.*'].concat(excludePatternGeneratedTestFiles),
				tasks: ['eslint']
			},
			tests: {
				files: ['src/**/*.*', 'sample-data/**/*.*', 'test/**/*.*'].concat(excludePatternGeneratedTestFiles),
				tasks: ['compileTests', 'compileTestsApi']
			}
		},
		connect: {
			server: {
				options: {
					hostname: '*',
					base: [
						'./examples',
						'./node_modules',
						'.'
					],
					port: grunt.option('port') || process.env.PORT || defaultPort,
					useAvailablePort: true, // increment port number, if unavailable
					onCreateServer: function (server/* , connect, options */) {
						server.on('listening', function () {
							// Export the port for consumption by other grunt tasks. async setup of connect isn't considered complete until after all event handlers for 'listening' finish, so this will always run before the next grunt task.
							grunt.config('port', server.address().port);
						});
					}
				}
			}
		},
		webpack: {
			options: require('./webpack.config'),
			build: {
			}
		},
		'webpack-dev-server': {
			start: {
				webpack: require('./webpack.config'),
				publicPath: '/build/',
				keepAlive: true,
				hot: true
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['eslint', 'compileTests', 'compileTestsApi', 'babel']);
	grunt.registerTask('serve', ['webpack-dev-server:start']);
	grunt.registerTask('test', ['eslint', 'compileTests', 'compileTestsApi', 'webpack', 'connect', 'mocha']);
};
