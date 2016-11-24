'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = startpopserver;

var _popServer = require('pop-server');

var _popServer2 = _interopRequireDefault(_popServer);

var _mailx = require('mailx');

var _mailx2 = _interopRequireDefault(_mailx);

var _mailcomposer = require('mailcomposer');

var _mailcomposer2 = _interopRequireDefault(_mailcomposer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startpopserver() {
	var PORT = 110;
	var SSL_PORT = 993;
	var uids = ['msg_1', 'msg_2', 'msg_3'];
	var server = new _popServer2.default({
		tls: {},
		auth: function auth(user, checkPassword) {
			var password = false;
			if (user === 'jdoe' || user === 'jdoe2') {
				password = 'correct_password';
			}
			return checkPassword(password);
		},
		store: {
			register: function register(cb) {
				if (this.user === "jdoe") {
					var self = this;
					uids.forEach(function (uid) {
						self.addMessage(uid, 40);
					});
				}
				cb();
			},
			read: function read(uid, cb) {
				var message = _mailx2.default.message();
				message.setFrom('me', 'me@example.net');
				message.addTo('you', 'you@example.net');
				message.setSubject('hello');
				message.setText('hi ! how are u?');
				message.setHtml('hi ! how are u? <b>hugs</b>');
				(0, _mailcomposer2.default)(message).build(cb);
			},
			removeDeleted: function removeDeleted(deleted, cb) {
				deleted.forEach(function (uid) {
					var index = uids.indexOf(uid);
					if (index > -1) {
						uids.splice(index, 1);
					}
				});
				cb();
			}
		}
	});
	server.listen(PORT, function (err) {
		if (err) {
			return done(err);
		}
		server.listenSSL(SSL_PORT);
	});
}