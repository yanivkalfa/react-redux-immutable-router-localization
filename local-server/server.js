'use strict';
const url = require('url');
const http = require('http');
const path = require('path');
const request = require('request');
const webpack = require('webpack');
const config = require('../configs/');
const webpackConfig = require('../webpack/webpack.local.' + config.env + '.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const app = express();

const webpackCompiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  hot: !config.isProd,
  historyApiFallback: true,
  quiet: config.isProd,
  noInfo: config.isProd,
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: config.isProd,
    timings: false,
    chunks: false,
    chunkModules: false
  }
}));

app.use(webpackHotMiddleware(webpackCompiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 5 * 1000
}));

app.use(express.static(config.paths.dist));


app.use('*', function(req, res) {
  res.sendFile(path.join(config.paths.dist, '/index.html'));
});

let server;
server = http.createServer(app);

server.listen(config.port, config.host, function(err, result) {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at ' + config.url);
});
