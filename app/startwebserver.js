'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startwebserver;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _open = require('open');

var _open2 = _interopRequireDefault(_open);

var _filehandler = require('./filehandler.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startwebserver(port) {
  var app = (0, _express2.default)();

  /* eslint-disable no-console */
  app.get('/', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, './index.html'));
  });
  app.get('/index.js', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, './index.js'));
  });
  app.get('/messages', function (req, res) {
    res.send((0, _filehandler.listMailFolders)());
  });

  app.listen(port, function (err) {
    if (err) {
      console.log(err);
    } else {
      (0, _open2.default)('http://localhost:' + port);
    }
  });
}