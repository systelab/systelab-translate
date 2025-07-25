// Karma configuration file, see link for more information
// https://karma-runner.github.io/4.0/config/configuration-file.html

module.exports = function(config) {
	config.set({
		basePath:                 '',
		frameworks:               ['jasmine', '@angular-devkit/build-angular'],
		plugins:                  [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage-istanbul-reporter'),
			
		],
		client:                   {
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		coverageIstanbulReporter: {
			dir: require('path').join(__dirname, 'coverage'), reports:               ['lcov'],
			fixWebpackSourcePaths: true
		},
		angularCli:               {
			environment: 'dev'
		},
		reporters:                ['progress', 'kjhtml', 'coverage-istanbul'],
		port:                     9876,
		colors:                   true,
		logLevel:                 config.LOG_INFO,
		autoWatch:                true,
		browsers:                 ['Chrome'],
		singleRun:                false
	});
};
