'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureWebService = undefined;
exports.default = startwebserver;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _open = require('open');

var _open2 = _interopRequireDefault(_open);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mailx = require('mailx');

var _mailx2 = _interopRequireDefault(_mailx);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _filehandler = require('./filehandler.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startwebserver(port) {
  var app = (0, _express2.default)();
  app.get('/', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, './index.html'));
  });
  app.get('/index.js', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, './index.js'));
  });

  configureWebService(app);
  app.listen(port, function (err) {
    if (err) {
      console.log(err);
    } else {
      (0, _open2.default)('http://localhost:' + port);
    }
  });
}
function configureWebService(app) {
  app.get('/bootstrap.css', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, './bootstrap.css'));
  });
  app.get('/cover.css', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, './cover.css'));
  });
  app.get('/pug.jpg', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, './pug.jpg'));
  });
  app.get('/mailboxes', function (req, res) {
    (0, _filehandler.listMailFolders)(req, res);
  });
  app.get('/mbx/:mbx', function (req, res) {
    (0, _filehandler.listMailMessages)(req, res);
  });
  app.get('/mbx/:mbx/:msgid', function (req, res) {
    var rawMessage = _fs2.default.readFileSync(_path2.default.join(__dirname, '../messages/' + req.params.mbx + '/' + req.params.msgid), 'UTF-8');
    _mailx2.default.parse(rawMessage, function (object, emailMessage) {
      res.send(emailMessage.subject);
    });
  });
  app.use((0, _compression2.default)());
}

exports.configureWebService = configureWebService;