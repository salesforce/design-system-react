module.exports = function(grunt) {

	grunt.initConfig({
		browserify: {
			dist: {
				options: {
					transform: [["babelify", {
						"stage": 0,
						"modules": "umd",
						"plugins": ["object-assign"]
					}]]
				},
				files: {
					"dist/jQuery/sample.js": "src/jQuery/sample.js",
					"dist/Backbone/sample.js": "src/Backbone/sample.js",
					"dist/React/sample.js": "src/React/sample.js"
				}
			}
		},
		watch: {
			scripts: {
				files: "src/**/*.js",
				tasks: ["browserify:dist"],
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
						path: './dist'
					},
					port: process.env.PORT || 8000,
					useAvailablePort: true // increment port number, if unavailable
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["browserify"]);
	grunt.registerTask("serve", ["connect:server", "browserify:dist", "watch:scripts"]);
};