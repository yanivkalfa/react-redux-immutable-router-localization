const path = require('path');
const pkg = require('../package.json');

// l18n - language.
const env = process.env.NODE_ENV || 'development';
const lang = process.env.LANGU || 'eng';
const paths = {
  public: '/user/',
  dist: path.join(__dirname, '../dist', '/' + lang),
  src: path.resolve(__dirname, '../src'),
  lang: path.join(__dirname, '../languages/' + lang)
};
const config = {
  lang, paths, env,
  appVersion: pkg.version,
  languagesLocalMap: require('./languagesLocalMap'),
  isProd: env === 'production',
  host: process.env.DEV_SERVER_HOST || 'localhost',
  port: process.env.DEV_SERVER_PORT || 3000,
  useHttps: /false/i.test(process.env.DEV_SERVER_NOHTTPS)
};
config.url = 'http' + (config.useHttps ? 's' : '') +
  '://' + config.host + ':' + config.port + '/';

module.exports = config;
