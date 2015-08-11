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
			scripts: {
				files: ['src/**/*.*', 'test/**/*.*'],
				tasks: ['browserify']
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
	grunt.registerTask('serve', ['connect:server', 'eslint', 'browserify', 'compileTests', 'watch:scripts']);
	grunt.registerTask('test', ['connect:server', 'browserify:tests', 'compileTests', 'mocha']);
};
