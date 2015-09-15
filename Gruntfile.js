module.exports = function (grunt) {
	grunt.loadTasks('tasks');

	const defaultPort = 8080;

	const excludePatternGeneratedTestFiles = [
		'!test/tests.js',
		'!test/tests-api.js',
		'!test/tests-compiled.js'
	];

	grunt.initConfig({
		babel: {
			options: {
				modules: 'umd'
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.js'],
					dest: 'dist/'
				}]
			}
		},
		port: defaultPort,
		excludePatternGeneratedTestFiles: excludePatternGeneratedTestFiles,
		eslint: {
			target: [
				'Gruntfile.js',
				'src/**/*.js',
				'tasks/**/*.js',
				'test/**/*.js'
			].concat(excludePatternGeneratedTestFiles)
		},
		mocha: {
			main: {
				options: {
					urls: ['http://localhost:<%= port %>/test/index.html'],
					run: true,
					log: true,
					reporter: 'Nyan'
				}
			}
		},
		watch: {
			eslint: {
				files: ['src/**/*.*', 'sample-data/**/*.*', 'test/**/*.*'].concat(excludePatternGeneratedTestFiles),
				tasks: ['eslint']
			},
			tests: {
				files: ['src/**/*.*', 'sample-data/**/*.*', 'test/**/*.*'].concat(excludePatternGeneratedTestFiles),
				tasks: ['compileTests', 'compileTestsApi']
			}
		},
		connect: {
			server: {
				options: {
					hostname: '*',
					base: [
						'./examples',
						'./node_modules',
						'.'
					],
					port: grunt.option('port') || process.env.PORT || defaultPort,
					useAvailablePort: true,
					onCreateServer: function (server) {
						server.on('listening', function () {
							grunt.config('port', server.address().port);
						});
					},
					keepalive: true
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
				keepAlive: true,
				hot: true
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['eslint', 'compileTests', 'compileTestsApi', 'babel']);
	grunt.registerTask('serve', ['eslint', 'webpack-dev-server:start']);
	grunt.registerTask('test', ['default', 'webpack', 'connect', 'mocha']);
};
