var fs = require('fs');
var path = require('path');
var parser = require('babel-jsxgettext');
var devConfigs = require('../configs/');
var glob = require('glob');
var files = glob.sync('./src/**/*.js');

var lanDir = path.join(devConfigs.paths.lang, '..');

if (!fs.existsSync(lanDir)){
  fs.mkdirSync(lanDir);
}

if (!fs.existsSync(devConfigs.paths.lang)){
  fs.mkdirSync(devConfigs.paths.lang);
}

parser(files, path.join(devConfigs.paths.lang, `/${ devConfigs.lang }.po`), 'objectRestSpread', function (err) {
  if (err) {
    throw err;
  }
});