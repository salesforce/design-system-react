module.exports = function(grunt) {
    grunt.registerTask('kill-webpack-build', 'Removes all files from buld/', function() {
        var
            output = '# Files Deleted \n\n',
            generatedFileName = '/kill-webpack-build-deleted.md'
        ;
        output += '## Manifest\n';
        output += 'List of files that were deleted from:\n\n';
        output += '`' + __PATHS__.build + '`\n\n';

        var files = grunt.file.expand([
            __PATHS__.build + '/*.*'
        ]);
        var deletedFiles = files.map(function(file) {
            var sourceFilePath = file;
            var destinationFilePath = __PATHS__.slds_site_assets + file.substring((__PATHS__.build.length))
                .replace('/design-system/assets/', '/design-system/')
                // .replace('/site/', '/')
                // .replace('/docco/', '/')
            ;
              grunt.file.delete(sourceFilePath, {force: true});
              return ' - [deleted] `' + sourceFilePath + '`\n';
        });
        output = output + deletedFiles.join('') + '\n';
        grunt.file.write(__PATHS__.tmp + generatedFileName, output);
        grunt.log.ok('Deleted ' + __PATHS__.tmp + generatedFileName);
    });
};
