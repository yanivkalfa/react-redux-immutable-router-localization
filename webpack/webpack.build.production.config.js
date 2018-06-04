'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var I18nGetTextPlugin = require("i18n-gettext-webpack-plugin");
var configs = require('../configs/');
var languagesLocalMap = configs.languagesLocalMap;
var paths = configs.paths;

module.exports = {
  entry: [
    path.join(paths.src, '/app/index.js'),
    path.join(paths.src, '/assets/styles/main.scss')
  ],
  resolve: {
    alias: {
      imgFolder: path.join(paths.src, '/assets/images'),
      iconImgFolder: path.join(configs.paths.src, '/app/components/Icon/assets/images')
    }
  },
  output: {
    path:  paths.dist,
    filename: 'assets/[name]-[hash].min.js',
    publicPath: paths.public
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
    new ExtractTextPlugin('assets/css/[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV),
      'window.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'window.appVersion': JSON.stringify(configs.appVersion)
    }),
    new webpack.ProvidePlugin({
      fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
    }),
    new I18nGetTextPlugin(languagesLocalMap[configs.lang], undefined, path.join(paths.lang, `/${ configs.lang }.po`))
  ],
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
        loader: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader!postcss-loader')
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