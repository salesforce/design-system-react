module.exports = function(grunt) {
    grunt.registerTask('build-www-docs', 'Crawls the site/docs files and copies them into the proper place in .www.', function() {
        var
            output = '# Site Docs Copied to WWW \n\n',
            generatedFileName = '/site-docs-files-copied.md',
            siteDocsFilePath = __PATHS__.site + '/docs',
            wwwDocsFilePath = __PATHS__.www + '/docs'
        ;
        output += '## Manifest\n';
        output += 'List of files that exists copied from:\n\n';
        output += '`' + siteDocsFilePath + '`\n\n';
        output += '...into:\n\n';
        output += '`' + __PATHS__.www + '`\n\n';

        var files = grunt.file.expand([
            siteDocsFilePath + '/**/*.*'
        ]);
        var newfiles = files.map(function(file) {
            var sourceFilePath = file;
            var destinationFilePath = wwwDocsFilePath + file.substring((siteDocsFilePath.length));
            grunt.file.copy(sourceFilePath, destinationFilePath);
            return ' - `' + sourceFilePath + '` --> `' + destinationFilePath + '`\n';
        });
        output = output + newfiles.join('') + '\n';
        grunt.file.write(__PATHS__.tmp + generatedFileName, output);
        grunt.log.ok('Wrote ' + __PATHS__.tmp + generatedFileName);
    });
};
