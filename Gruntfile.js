module.exports = function (grunt) {
	grunt.loadTasks('tasks');

	grunt.initConfig({
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
					'examples/react/examples.js': 'src/react/examples.js',
					"examples/react/tree-examples.js": "src/react/tree-examples.js"
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
			target: ['Gruntfile.js', 'src/**/*.js']
		},
		mocha: {
			main: {
				options: {
					urls: ['http://localhost:8000/test/index.html'],
					run: true
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
				files: ['src/**/*.*'],
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
					port: process.env.PORT || 8000,
					useAvailablePort: true // increment port number, if unavailable
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
	grunt.registerTask('test', ['connect:server', 'compileTests', 'browserify:tests', 'mocha']);
};
