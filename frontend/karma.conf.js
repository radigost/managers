// karma // Karma configuration
// Generated on Sat Aug 13 2016 22:01:35 GMT+0300 (MSK)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['source-map-support','jasmine'],

    // list of files / patterns to load in the browser
    files: [
        './node_modules/angular/angular.js',
        './node_modules/angular-mocks/angular-mocks.js',
        './node_modules/@angular/router/angular1/angular_1_router.js',
        './node_modules/lodash/lodash.js',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
        './node_modules/restangular/src/restangular.js',
        './node_modules/ngstorage/ngStorage.js',
        './node_modules/angular-cookies/angular-cookies.js',

        './src/entry.js',
        './src/**/entry.js',
        './tests/entry.js'
        // './src/app/entry.js',
        // './tests/entry.js',
    ],
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },
    webpack:{
      module: {
         loaders:
             [

                 { test: /\.coffee$/, loader: "coffee-loader" },
                 // { test: /\.html$/, loader: "html" },
                 {test: /\.jade/, loader: "pug-loader"},
        ]
     },
        devtool: 'inline-source-map'
    },


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/entry.js' : ['webpack','sourcemap'],
      'tests/entry.js': ['webpack','sourcemap'],
      // '**/*.coffee': ['webpack']
    },



    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    // browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
