module.exports = function (grunt) {
	grunt.loadTasks('tasks');

	const defaultPort = 8000;

	grunt.initConfig({
		port: defaultPort,
		browserify: {
			examples: {
				options: {
					transform: [['babelify', {
						'stage': 0,
						'modules': 'umd'
					}], ['brfs'], ['browserify-versionify']]
				},
				files: {
					'examples/jquery/examples.js': 'src/jquery/examples.js',
					'examples/marionette/examples.js': 'src/marionette/examples.js',
					'examples/react/examples.js': 'src/react/examples.js'
				}
			},
			tests: {
				options: {
					transform: [['babelify', {
						'stage': 0,
						'modules': 'umd'
					}], ['brfs'], ['browserify-versionify']]
				},
				files: {
					'test/tests-compiled.js': 'test/tests.js'
				}
			}
		},
		eslint: {
			target: [
				'Gruntfile.js',
				'src/**/*.js',
				'test/**/*.js',
				'!test/tests-compiled.js',
				'!test/tests.js'
			]
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
		uglify: {
			examples: {
				files: {
					'examples/jquery/examples.min.js': ['examples/jquery/examples.js'],
					'examples/marionette/examples.min.js': ['examples/marionette/examples.js'],
					'examples/react/examples.min.js': ['examples/react/examples.js']
				}
			}
		},
		watch: {
			examples: {
				files: ['src/**/*.*', 'sample-data/**/*.*'],
				tasks: ['eslint', 'browserify:examples']
			},
			tests: {
				files: ['src/**/*.*', 'test/**/*.*', '!test/tests.js', '!test/tests-compiled.js'],
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
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask('default', ['eslint', 'browserify']);
	grunt.registerTask('serve', ['connect:server', 'eslint', 'browserify:examples', 'watch:examples']);
	grunt.registerTask('test', ['connect:server', 'eslint', 'compileTests', 'browserify:tests', 'mocha']);
};
