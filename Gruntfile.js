module.exports = function (grunt) {
	grunt.loadTasks('tasks');

	const defaultPort = 8000;

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
		browserify: {
			options: {
				transform: [['babelify', {
					'stage': 0
				}], ['brfs'], ['browserify-versionify']],
				watch: true
			},
			jqueryExamples: {
				files: {
					'examples/jquery/examples.js': 'src/jquery/examples.js'
				}
			},
			reactExamples: {
				files: {
					'examples/react/examples.js': 'src/react/examples.js'
				}
			},
			tests: {
				files: {
					'test/tests-compiled.js': 'test/tests.js'
				}
			}
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
			jqueryExamples: {
				files: ['src/**/*.*', 'sample-data/**/*.*', '!src/marionette/**/*.*', '!src/react/**/*.*'],
				tasks: ['browserify:jqueryExamples']
			},
			reactExamples: {
				files: ['src/**/*.*', 'sample-data/**/*.*', '!src/jquery/**/*.*', '!src/marionette/**/*.*'],
				tasks: ['browserify:reactExamples']
			},
			tests: {
				files: ['src/**/*.*', 'sample-data/**/*.*', 'test/**/*.*'].concat(excludePatternGeneratedTestFiles),
				tasks: ['compileTests', 'compileTestsApi', 'browserify:tests']
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
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['eslint', 'compileTests', 'compileTestsApi', 'browserify:jqueryExamples', 'browserify:reactExamples']);
	grunt.registerTask('serve', ['connect:server', 'default', 'watch']);
	grunt.registerTask('test', ['eslint', 'compileTests', 'compileTestsApi', 'browserify:tests', 'connect:server', 'mocha']);
};
