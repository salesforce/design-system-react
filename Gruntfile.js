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
					"dist/Backbone/sample.js": "src/Backbone/sample.js",
					"dist/React/sample.js": "src/React/sample.js"
				}
			}
		},
		watch: {
			scripts: {
				files: "src/**/*.js",
				tasks: ["browserify"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["browserify"]);
};