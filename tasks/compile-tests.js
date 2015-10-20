/* eslint-disable no-var */

// Creates tests.js file

module.exports = function (grunt) {
	grunt.registerTask('compileTests', 'Compiles and saves the full list of tests.', function () {
		var output = '// GENERATED FILE: the full list of tests used by test/index.html.\n\n';
		// TODO add the path 'test/compat/**/*.js' back into the expand call below when building legacy Fuel UX compatibility
		var files = grunt.file.expand(['test/behavior/**/*.js'].concat(grunt.config('excludePatternGeneratedTestFiles')));
		files = files.map(function (file) {
			return 'require(\'./' + file.substring(5) + '\');';
		});

		output = output + files.join('\n') + '\n';

		grunt.file.write('test/tests.js', output);
		grunt.log.ok('Wrote test/tests.js');
	});
};
