module.exports = function(grunt) {
	grunt.registerTask('compileTests', 'Compiles and saves the full list of tests.', function() {
		var files = grunt.file.expand(['test/**/*.js'].concat(grunt.config('excludePatternGeneratedTestFiles')));
		files = files.map(function(file) {
			return 'require(\'./' + file.substring(5) + '\');';
		});

		grunt.file.write('test/tests.js', files.join('\n')+'\n');
	});
};
