var webpack = require('webpack');
var minimize = process.argv.indexOf('--no-minimize') === -1 ? true : false;
var packPlugins = minimize
  ? [new webpack.optimize.UglifyJsPlugin({ minimize: true })]
  : [];

module.exports = {
  entry: './src/ttstylesheet.js',
  output: {
    path: './dist',
    filename: minimize ? 'ttstylesheet.min.js' : 'ttstylesheet.js',
    libraryTarget: 'umd',
    library: 'TTStylesheet'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }]
  },
  plugins: packPlugins
};
