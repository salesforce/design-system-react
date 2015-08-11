module.exports = function(grunt) {
  grunt.registerTask('compileTests', 'Compiles and saves the full list of tests.', function() {
    var files = grunt.file.expand(['test/**/*.js', '!test/tests.js', '!test/tests-compiled.js']);
    files = files.map(function(file) {
      return 'require(\'./' + file.substring(5) + '\')\n';
    });

    grunt.file.write('test/tests.js', files);
  });
};
