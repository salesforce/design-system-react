module.exports = function(grunt) {
    grunt.registerTask('build-www-examples', 'Crawls the site/examples files and copies them into the proper place in .www.', function() {
        var
            output = '# Site Docs Copied to WWW \n\n',
            generatedFileName = '/site-examples-files-copied.md',
            sourceFilePathPrefix = __PATHS__.site + '/examples',
            destinationFilePathPrefix = __PATHS__.www + '/examples'
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
