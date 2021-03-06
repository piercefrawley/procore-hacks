const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool : 'eval-source-map',

  entry: [
    'babel-polyfill',
    './js/index.js',
    './scss/main.scss',
  ],

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../app/assets/javascripts/generated/bundle'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
    root: [ path.join(__dirname, 'app/') ],
  },
  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'babel', exclude: /node_modules/,
        query: { presets: ['es2015', 'react', 'stage-0'] }
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'css-loader!postcss-loader' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!postcss-loader!sass') },
      { test: /\.png$/, loader: 'url-loader?prefix=img/&limit=5000' },
      { test: /\.jpg$/, loader: 'url-loader?prefix=img/&limit=5000' },
      { test: /\.gif$/, loader: 'url-loader?prefix=img/&limit=5000' },
      { test: /\.woff$/, loader: 'url-loader?prefix=font/&limit=5000' },
      { test: /\.woff2$/, loader: 'url-loader?prefix=font/&limit=5000' },
      { test: /\.eot$/, loader: 'file-loader?prefix=font/' },
      { test: /\.ttf$/, loader: 'file-loader?prefix=font/' },
      { test: /\.svg$/, loader: 'file-loader?prefix=font/' },
      { test: /\.txt$/, loader: 'raw-loader' },
    ]
  },
  plugins: [
    new ExtractTextPlugin('./scss/[name].scss'),
  ],
  postcss: [ autoprefixer({ browsers: '> 5%'}) ]
};
