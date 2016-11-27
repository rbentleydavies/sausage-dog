'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listMailMessages = exports.listMailFolders = exports.saveFile = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

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
function listMailFolders() {
  if (!_fs2.default.existsSync('messages')) {
    return 'No message received';
  }
  var messageFolderList = '<ul>';
  _fs2.default.readdirSync('messages').forEach(function (folder) {
    messageFolderList += '<li><a href=\'#\' class=\'mailboxlink\'>' + folder + '</a></li>';
  });
  messageFolderList += '</ul>';
  return messageFolderList;
}
function listMailMessages(mailbox) {
  if (!_fs2.default.existsSync('messages')) {
    return 'No message received';
  }
  if (!_fs2.default.existsSync('messages/' + mailbox)) {
    return 'No message received';
  }
  var messagesList = '<ul>';
  _fs2.default.readdirSync('messages/' + mailbox).forEach(function (message) {
    messagesList += '<li><a href=\'#\' class=\'messagelink\'>' + mailbox + '/' + message + '</a></li>';
  });
  messagesList += '</ul>';
  return messagesList;
}
exports.saveFile = saveFile;
exports.listMailFolders = listMailFolders;
exports.listMailMessages = listMailMessages;