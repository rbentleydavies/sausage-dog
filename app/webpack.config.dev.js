'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [_path2.default.resolve(__dirname, 'src/index')],
  target: 'web',
  output: {
    path: _path2.default.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [new _htmlWebpackPlugin2.default({
    inject: true,
    template: 'src/index.html'
  })],
  module: {
    loaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] }, { test: /\.css$/, loaders: ['style', 'css'] }]
  }

};