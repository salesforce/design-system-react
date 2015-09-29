/* eslint-disable no-var */

// Creates tests.js file

module.exports = function (grunt) {
	grunt.registerTask('compileTests', 'Compiles and saves the full list of tests.', function () {
		var files = grunt.file.expand(['test/jquery-declarative/**/*.js', 'test/behavior/**/*.js'].concat(grunt.config('excludePatternGeneratedTestFiles')));
		files = files.map(function (file) {
			return 'require(\'./' + file.substring(5) + '\');';
		});

		grunt.file.write('test/tests.js', files.join('\n') + '\n');
		grunt.log.ok('Wrote test/tests.js');
	});
};
