'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listMailMessages = exports.listMailFolders = exports.saveFile = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _mailx = require('mailx');

var _mailx2 = _interopRequireDefault(_mailx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saveFile(from, to, message) {
  if (!_fs2.default.existsSync('messages')) {
    _fs2.default.mkdirSync('messages');
  }
  if (!_fs2.default.existsSync('messages/' + to)) {
    _fs2.default.mkdirSync('messages/' + to);
  }
  var filename = (0, _uuid2.default)();
  _fs2.default.writeFile('messages/' + to + '/' + filename, message, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('email file was saved');
  });
}
function listMailFolders(req, res) {
  var retval = [];
  if (_fs2.default.existsSync('messages')) {
    _fs2.default.readdirSync('messages').forEach(function (folder) {
      retval.push({ name: folder });
    });
  };
  res.send(JSON.stringify(retval));
}
function listMailMessages(req, res) {
  var mailbox = req.params.mbx;
  var retval = [];
  if (_fs2.default.existsSync('messages') && _fs2.default.existsSync('messages/' + mailbox)) {
    var messagesRaw = _fs2.default.readdirSync('messages/' + mailbox);
    messagesRaw.forEach(function (message) {
      var messageRaw = _fs2.default.readFileSync('messages/' + mailbox + '/' + message);
      _mailx2.default.parse(messageRaw, function (object, emailMessage) {
        retval.push(emailMessage);
        if (retval.length == messagesRaw.length) {
          res.send(JSON.stringify(retval));
        };
      });
    });
  };
};
exports.saveFile = saveFile;
exports.listMailFolders = listMailFolders;
exports.listMailMessages = listMailMessages;