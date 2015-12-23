module.exports = function(grunt) {
    grunt.registerTask('build-www-assets', 'Crawls the site assets files and copies them into the proper place in .www/assets.', function() {
        var
            output = '# Site Assets Copied to WWW \n\n',
            generatedFileName = '/site-assets-files-copied.md'
        ;
        output += '## Manifest\n';
        output += 'List of files that exists copied from:\n\n';
        output += '`' + __PATHS__.assets + '`\n\n';
        output += '...into:\n\n';
        output += '`' + __PATHS__.www + '`\n\n';

        var files = grunt.file.expand([
            __PATHS__.assets + '/demo-site/**/*.*',
            __PATHS__.assets + '/design-system/**/*.*',
            __PATHS__.assets + '/facades/**/*.*',
            __PATHS__.assets + '/docco/**/*.*'
        ]);
        var newfiles = files.map(function(file) {
            var sourceFilePath = file;
            var destinationFilePath = __PATHS__.www + '/assets' + file.substring((__PATHS__.assets.length))
                .replace('/design-system/', '/')
                .replace('/demo-site/', '/')
                .replace('/facades/', '/')
                .replace('/docco/', '/styles/')
            ;
              grunt.file.copy(sourceFilePath, destinationFilePath);
              return ' - `' + sourceFilePath + '` --> `' + destinationFilePath + '`\n';
        });
        output = output + newfiles.join('') + '\n';
        grunt.file.write(__PATHS__.tmp + generatedFileName, output);
        grunt.log.ok('Wrote ' + __PATHS__.tmp + generatedFileName);
    });
};
