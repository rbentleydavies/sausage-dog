import POPServer from 'pop-server';
import mailx from 'mailx';
import mailcomposer from 'mailcomposer';

export default function startpopserver(){
  const	PORT = 110;
const SSL_PORT = 993;
var uids = ['msg_1', 'msg_2', 'msg_3'];
const server = new POPServer({
			tls: {},
			auth: function(user, checkPassword) {
        var password = false;
        if (user === 'jdoe' || user === 'jdoe2') {
            password = 'correct_password';
        }
        return checkPassword(password);
      },
			store: {
				register: function(cb) {
					if (this.user === "jdoe") {
						var self = this;
						uids.forEach(function(uid) {
							self.addMessage(uid, 40);
						});
					}
					cb();
				},
				read: function(uid, cb) {
					var message =  mailx.message();
					message.setFrom('me', 'me@example.net');
					message.addTo('you', 'you@example.net');
					message.setSubject('hello');
					message.setText('hi ! how are u?');
					message.setHtml('hi ! how are u? <b>hugs</b>');
					mailcomposer(message).build(cb);
				},
				removeDeleted: function(deleted, cb) {
					deleted.forEach(function(uid) {
						var index = uids.indexOf(uid);
						if (index > -1) {
							uids.splice(index, 1);
						}
					});
					cb();
				}
			}
		});
		server.listen(PORT, function(err) {
			if (err) {
				return done(err);
			}
			server.listenSSL(SSL_PORT);
		});



}
