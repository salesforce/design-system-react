module.exports = function(grunt) {

	grunt.initConfig({
		browserify: {
			dist: {
				options: {
					transform: [["babelify", {
						"stage": 0,
						"modules": "umd"
					}]]
				},
				files: {
					"dist/jQuery/sample.js": "src/jQuery/sample.js",
					"dist/Backbone/sample.js": "src/Backbone/sample.js"
					// "dist/React/sample.js": "src/React/sample.js"
				}
			},
			react: {
				files: {
					'dist/React/sample.js': ['src/react/sample.js']
				},
				options: {
					transform: [
						'babelify'
					]
				},
			},
		},
		watch: {
			scripts: {
				files: "src/**/*.js",
				tasks: ["browserify:dist", "browserify:react"],
				options: {
					livereload: true
				}
			},
			react: {
				files: ["src/**/*.js", "src/**/*.jsx"],
				tasks: ["browserify:react"],
				options: {
					livereload: true
				}
			}
		},
		connect: {
			server: {
				options: {
					hostname: '*',
					base: {
						path: '.',
						options: {
							index: ['src/index.html'],
						}
					},
					port: process.env.PORT || 8000,
					useAvailablePort: true // increment port number, if unavailable...
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["browserify"]);
	grunt.registerTask("serve", ["connect:server", "browserify:react", "browserify:dist", "watch:scripts"]);
	grunt.registerTask("serve-react", ["connect:server", "browserify:react", "watch:react"]);
};