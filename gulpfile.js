var gulp = require('gulp');

var beautify = require('gulp-beautify');
var concat = require('gulp-concat-util');
var pkg = require('./package.json');
var serve = require('gulp-serve');

// Default gulp task, builds the dist file(s).
gulp.task('default', function() {
	var banner = '/*!\n' +
		' * Landmark JS POC v' + pkg.version + ' \n' +
		' */\n\n';

	gulp.src('./js/*.js')
		.pipe(concat('landmark.js', { process: function(src) {
			var header = '(function(landmark){\n';
			var footer = '}(landmark));\n\n';

			if (src.search(/(\/\/\*\*\*\*\*LANDMARK CORE FILE\*\*\*\*\*\/\/)/) === 0) {
				header = '';
				footer = '';
			}

			src = src.replace(/(\n|.)*\/\/ -- BEGIN MODULE CODE HERE -- \/\/\n/g, header);
			src = src.replace(/\/\/ -- END MODULE CODE HERE -- \/\/(\n|.)*/g, footer);

			return src;
		}}))
		.pipe(concat.header(banner))
		.pipe(concat.footer('return landmark;\n}));\n'))
		.pipe(beautify({ indentChar: '\t', indentSize: 1 }))
		.pipe(gulp.dest('dist'));
});

// Gulp serve task
gulp.task('serve', serve('./'));
