module.exports = function(grunt) {

	grunt.initConfig({
		browserify: {
			examples: {
				options: {
					transform: [["babelify", {
						"stage": 0,
						"modules": "umd",
						"plugins": ["object-assign"]
					}], ["brfs"]]
				},
				files: {
					"examples/jquery/sample.js": "src/jquery/sample.js",
					"examples/backbone/sample.js": "src/backbone/sample.js",
					"examples/react/sample.js": "src/react/sample.js",
					"examples/react/tree-sample.js": "src/react/tree-sample.js"
				}
			}
		},
		watch: {
			scripts: {
				files: "src/**/*.*",
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
