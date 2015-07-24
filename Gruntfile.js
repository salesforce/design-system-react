module.exports = function(grunt) {

	grunt.initConfig({
		browserify: {
			examples: {
				options: {
					transform: [["babelify", {
						"stage": 0,
						"modules": "umd",
						"plugins": ["object-assign"]
					}]]
				},
				files: {
					"examples/jQuery/sample.js": "src/jQuery/sample.js",
					"examples/Backbone/sample.js": "src/Backbone/sample.js",
					"examples/React/sample.js": "src/React/sample.js"
				}
			}
		},
		watch: {
			scripts: {
				files: "src/**/*.js",
				tasks: ["browserify:examples"],
				options: {
					livereload: true
				}
			}
		},
		connect: {
			server: {
				options: {
					hostname: '*',
					base: [
						'./examples',
						'./node_modules'
					],
					port: process.env.PORT || 8000,
					useAvailablePort: true // increment port number, if unavailable
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["browserify:examples"]);
	grunt.registerTask("serve", ["connect:server", "browserify:examples", "watch:scripts"]);
};