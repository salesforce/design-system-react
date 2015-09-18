/* eslint-disable no-var */
module.exports = function (grunt) {
	grunt.registerTask('compileTestsApi', 'Compiles and saves the mapping of component to its tests API for use by behavior tests.', function () {
		var pkg = require('../package.json');

		var output = '';
		pkg.components.forEach(function (componentName) {
			output += 'export const ' + componentName + ' = {\n';

			pkg.facades.forEach(function (facadeName, facadeIndex) {
				output += '\t' + facadeName + ': require(\'./' + facadeName + '/' + componentName + '-test\')';

				if (facadeIndex !== pkg.facades.length - 1) {
					output += ',';
				}
				output += '\n';
			});

			output += '};\n';
		});

		grunt.file.write('test/tests-api.js', output);
		grunt.log.ok('Wrote test/tests-api.js');
	});
};
