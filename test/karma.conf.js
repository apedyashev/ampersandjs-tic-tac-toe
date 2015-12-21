module.exports = function(config) {
    config.set({

        basePath: '',

        // frameworks to use
        frameworks: ['browserify', 'jasmine'],

        // list of files / patterns to load in the browser
        files: [
            '../src/**/*.js',
            '**/*.js'
        ],

        // list of files to exclude
        exclude: [
        ],

        preprocessors: {
            '../src/**/*.js': ['browserify'],
            '**/*.js': ['browserify']
        },

        // test results reporter to use
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers
        browsers: ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        browserify: {
            debug: true,
            transform: ['babelify']
        }
    });
};
