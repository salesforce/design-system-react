module.exports = function(grunt) {
    grunt.registerTask('build-www-facades-bundles', 'Crawls the /build files and copies them into the proper place in .www.', function() {
        var
            output = '# Build files copied to WWW \n\n',
            generatedFileName = '/facades-bundles-files-copied.md',
            sourceFilePathPrefix = __PATHS__.build,
            destinationFilePathPrefix = __PATHS__.www + '/assets/scripts'
        ;
        output += '## Manifest\n';
        output += 'List of files that exists copied from:\n\n';
        output += '`' + sourceFilePathPrefix + '`\n\n';
        output += '...into:\n\n';
        output += '`' + __PATHS__.www + '`\n\n';

        var files = grunt.file.expand([
            sourceFilePathPrefix + '/**/*.*'
        ]);
        var newfiles = files.map(function(file) {
            var sourceFilePath = file;
            var destinationFilePath = destinationFilePathPrefix + file.substring((sourceFilePathPrefix.length));
            grunt.file.copy(sourceFilePath, destinationFilePath);
            return ' - `' + sourceFilePath + '` --> `' + destinationFilePath + '`\n';
        });
        output = output + newfiles.join('') + '\n';
        grunt.file.write(__PATHS__.tmp + generatedFileName, output);
        grunt.log.ok('Wrote ' + __PATHS__.tmp + generatedFileName);
    });
};
