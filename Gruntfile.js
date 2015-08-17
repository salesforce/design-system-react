module.exports = function (grunt) {
	grunt.loadTasks('tasks');

	const defaultPort = 8000;

	grunt.initConfig({
		port: defaultPort,
		eslint: {
			target: [
				'Gruntfile.js',
				'src/**/*.js',
				'test/**/*.js',
				'!test/tests-compiled.js',
				'!test/tests.js'
			]
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
			marionetteExamples: {
				files: {
					'examples/marionette/examples.js': 'src/marionette/examples.js'
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
				files: ['src/**/*.*', 'sample-data/**/*.*', 'test/**/*.*', '!test/tests.js', '!test/tests-compiled.js'],
				tasks: ['eslint']
			},
			jqueryExamples: {
				files: ['src/**/*.*', 'sample-data/**/*.*', '!src/marionette/**/*.*', '!src/react/**/*.*'],
				tasks: ['browserify:jqueryExamples']
			},
			marionetteExamples: {
				files: ['src/**/*.*', 'sample-data/**/*.*', '!src/jquery/**/*.*', '!src/react/**/*.*'],
				tasks: ['browserify:marionetteExamples']
			},
			reactExamples: {
				files: ['src/**/*.*', 'sample-data/**/*.*', '!src/jquery/**/*.*', '!src/marionette/**/*.*'],
				tasks: ['browserify:reactExamples']
			},
			tests: {
				files: ['src/**/*.*', 'sample-data/**/*.*', 'test/**/*.*', '!test/tests.js', '!test/tests-compiled.js'],
				tasks: ['compileTests', 'browserify:tests']
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

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask('default', ['eslint', 'compileTests', 'browserify']);
	grunt.registerTask('serve', ['connect:server', 'default', 'watch']);
	grunt.registerTask('test', ['eslint', 'compileTests', 'browserify:tests', 'connect:server', 'mocha']);
};
