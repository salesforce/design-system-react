module.exports = function (grunt) {
	grunt.loadTasks('tasks');

	// Look in ./tasks for additional task modules
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	const defaultPort = 8080;

	const excludePatternGeneratedTestFiles = [
		'!test/tests.js',
		'!test/tests-api.js',
		'!test/tests-compiled.js'
	];

	const defaultWatchFiles = ['Gruntfile.js', 'tasks/**/*.*', 'src/**/*.*', 'sample-data/**/*.*', 'test/**/*.*'];

	grunt.initConfig({
		// VARIABLES
		port: grunt.option('port') || process.env.PORT || defaultPort,
		excludePatternGeneratedTestFiles: excludePatternGeneratedTestFiles,

		// TASK CONFIG
		babel: {
			options: {
				modules: 'umd',
				experimental: true
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.js', '!**/example.js', '!**/examples.js'],
					dest: 'dist/'
				}]
			}
		},
		eslint: {
			target: [
				'Gruntfile.js',
				'src/**/*.js',
				'tasks/**/*.js',
				'test/**/*.js',
				'!test/compat/*.js'
			].concat(excludePatternGeneratedTestFiles)
		},
		mocha: {
			main: {
				options: {
					urls: ['http://localhost:<%= port %>/test/index.html'],
					run: true,
					log: true,
					reporter: 'Dot'
				}
			}
		},
		watch: {
			eslint: {
				files: defaultWatchFiles.concat(excludePatternGeneratedTestFiles),
				tasks: ['eslint']
			},
			tests: {
				files: defaultWatchFiles.concat(excludePatternGeneratedTestFiles),
				tasks: ['eslint', 'compileTests', 'compileTestsApi']
			}
		},
		connect: {
			server: {
				options: {
					hostname: '*',
					base: [
						'./examples',
						'./fonts',
						'./node_modules',
						'.'
					],
					port: '<%= port %>',
					useAvailablePort: true,
					onCreateServer: function (server) {
						server.on('listening', function () {
							grunt.config('port', server.address().port);
						});
					}
				}
			}
		},
		webpack: {
			options: require('./webpack.config'),
			build: {
			}
		},
		'webpack-dev-server': {
			start: {
				webpack: require('./webpack.config'),
				publicPath: '/build/',
				port: '<%= port %>',
				keepAlive: true,
				hot: true
			}
		}

	});

	grunt.registerTask('default', ['compileTests', 'compileTestsApi']);
	grunt.registerTask('build', ['default', 'eslint', 'babel']);
	grunt.registerTask('serve', 'Runs webpack with hot module swapping', ['default', 'webpack-dev-server:start']);
	grunt.registerTask('serve-watch', 'For concurrent watch task / webpack watch (use in new window)', ['default', 'watch:tests']);
	grunt.registerTask('test', ['default', 'webpack', 'connect', 'mocha']);
};
