'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startmailserver;

var _smtpServer = require('smtp-server');

var _filehandler = require('./filehandler.js');

function startmailserver() {
  var server = new _smtpServer.SMTPServer({
    logger: false,

    onData: function onData(stream, session, callback) {
      var message = '';
      var from = '';
      var to = '';
      stream.on('data', function (buffer) {
        var part = buffer.toString();
        message += part;
        from = session.envelope.mailFrom.address;
        to = session.envelope.rcptTo;
      });

      stream.on('end', function () {
        to.forEach(function (t) {
          (0, _filehandler.saveFile)(from, t.address, message);
        });
        callback();
      });
    },

    disabledCommands: ['AUTH', 'STARTTLS']
  });

  server.listen(25);
}