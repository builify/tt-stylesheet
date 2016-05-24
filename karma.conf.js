const path = require('path');
const webpackConf = require('./webpack.config.js');

module.exports = (config) => {
  config.set({
    files: [
      path.join('node_modules', 'phantomjs-polyfill', 'bind-polyfill.js'),
      path.join('test', '**', '*.js')
    ],
    frameworks: ['mocha', 'unexpected'],
    preprocessors: {
      'test/**/*.js': ['webpack']
    },
    webpack: {
      module: webpackConf.module
    },
    webpackMiddleware: {
      noInfo: true
    },
    browsers: ['PhantomJS'],
    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-unexpected'),
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter')
    ],
  });
};
