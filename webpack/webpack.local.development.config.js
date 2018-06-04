'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var I18nGetTextPlugin = require("i18n-gettext-webpack-plugin");
var configs = require('../configs/');
var languagesLocalMap = configs.languagesLocalMap;

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch?reload=true',
    'webpack-hot-middleware/client',
    path.join(configs.paths.src, '/app/index.js'),
    path.join(configs.paths.src, '/assets/styles/main.scss')
  ],
  resolve: {
    alias: {
      imgFolder: path.join(configs.paths.src, '/assets/images'),
      iconImgFolder: path.join(configs.paths.src, '/app/components/Icon/assets/images')
    }
  },
  output: {
    path: configs.paths.dist,
    filename: 'assets/[name].js',
    publicPath: configs.paths.public
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/app/index.tpl.html',
      inject: 'body',
      hash: true,
      filename: 'index.html',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV),
      'window.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'window.appVersion': JSON.stringify(configs.appVersion)
    }),
    new webpack.ProvidePlugin({
      fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
    }),
    new I18nGetTextPlugin(languagesLocalMap[configs.lang], undefined, path.join(configs.paths.lang, `/${ configs.lang }.po`))
  ],
  // ESLint options
  eslint: {
    configFile: '.eslintrc',
    failOnWarning: false,
    failOnError: true
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader','css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader' ]
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype:'application/font-woff',
          name: 'assets/fonts/[name].[ext]'
        }
      },
      { test: /\.(jpe?g|png|gif|ico|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'assets/images/[name].[ext]'
        }
      },
      {
        test: /\.(ttf|eot)(\?[a-z0-9#=&.]+)?$/,
        loader: 'file',
        query: {
          limit: 10000,
          name: 'assets/fonts/[name].[ext]'
        }
      }
    ]
  },
  postcss: [ require('autoprefixer') ]
};
