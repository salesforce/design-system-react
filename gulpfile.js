var fs = require('fs');
var gulp = require('gulp');

var beautify = require('gulp-beautify');
var concat = require('gulp-concat-util');
var pkg = require('./package.json');
var serve = require('gulp-serve');

// Builds the vanilla library
gulp.task('buildVanillaLibrary', function() {
	var banner = '' +
		'/*!\n' +
		' * Landmark JS POC v' + pkg.version + ' \n' +
		' */\n\n';

	gulp.src('./js/*.js')	//NOTE: might need a file order eventually
		.pipe(concat('landmark.js', { process: function(src) {
			var header = '(function(landmark){\n';
			var footer = '}(landmark));\n\n';

			//TODO: is there a better / faster way to determine this is the core.js file? Using the filenname would be ideal, but from my initial search the plugin doesn't expose it to this function
			if (src.substr(0, 34) === '// ---- LANDMARK CORE FILE ---- //') {
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

// Builds the jQuery extension
gulp.task('buildJQueryExtension', function() {
	fs.readFile('./js/extensions/jQuery/umd-open.txt', 'utf8', function (err, umdOpen) {
		if (err) {
			return console.log('Error loading umd-open.txt for buildJQueryExtension task: ', err);
		}

		var header = '' +
			'/*!\n' +
			' * Landmark JS POC - jQuery Extension v' + pkg.version + '\n' +
			' */\n\n' +
			umdOpen + '\n';
		var footer = '}));\n';

		gulp.src('./js/extensions/jQuery/*.js')
			.pipe(concat('landmark-jquery.js', { process: function(src) {
				src = src.replace(/(\n|.)*\/\/ -- BEGIN MODULE CODE HERE -- \/\/\n/g, '(function($, landmark){\n');
				src = src.replace(/\/\/ -- END MODULE CODE HERE -- \/\/(\n|.)*/g, '}($, landmark));\n\n');

				return src;
			}}))
			.pipe(concat.header(header))
			.pipe(concat.footer(footer))
			.pipe(beautify({ indentChar: '\t', indentSize: 1 }))
			.pipe(gulp.dest('dist'));
	});
});

// Default gulp task, builds the dist file(s) for the vanilla library and jQuery extension (currently).
gulp.task('default', [
	'buildVanillaLibrary',
	 'buildJQueryExtension'
], function() { });

// Gulp serve task
gulp.task('serve', serve('./'));
