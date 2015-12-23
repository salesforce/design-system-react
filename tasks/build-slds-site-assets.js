module.exports = function(grunt) {
    grunt.registerTask('build-slds-site-assets', 'Crawls the slds assets files and copies them into the proper place in public/assets/design-system.', function() {
        var
            output = '# SLDS Assets Copied to Public \n\n',
            generatedFileName = '/slds-site-assets-files-copied.md'
        ;
        output += '## Manifest\n';
        output += 'List of files that exists copied from:\n\n';
        output += '`' + __PATHS__.slds_assets + '`\n\n';
        output += '...into:\n\n';
        output += '`' + __PATHS__.slds_site_assets + '`\n\n';

        var files = grunt.file.expand([
            __PATHS__.slds_assets + '/**/*.*'
        ]);
        var newfiles = files.map(function(file) {
            var sourceFilePath = file;
            var destinationFilePath = __PATHS__.slds_site_assets + file.substring((__PATHS__.slds_assets.length))
                .replace('/design-system/assets/', '/design-system/')
                // .replace('/site/', '/')
                // .replace('/docco/', '/')
            ;
              grunt.file.copy(sourceFilePath, destinationFilePath);
              return ' - `' + sourceFilePath + '` --> `' + destinationFilePath + '`\n';
        });
        output = output + newfiles.join('') + '\n';
        grunt.file.write(__PATHS__.tmp + generatedFileName, output);
        grunt.log.ok('Wrote ' + __PATHS__.tmp + generatedFileName);
    });
};
