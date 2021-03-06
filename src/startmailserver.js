import {SMTPServer} from 'smtp-server';
import {saveFile} from './filehandler.js';

export default function startmailserver(){
const server = new SMTPServer({
    logger: false,

    onData(stream, session, callback){
      var message = '';
      var from = '';
      var to = '';
      stream.on('data',function(buffer){
      var part = buffer.toString();
      message += part;
      from = session.envelope.mailFrom.address;
      to = session.envelope.rcptTo;
      });


      stream.on('end',function(){
        to.forEach((t)=>{
          if(t.address.endsWith("emailpug.com")){
            saveFile(from, t.address, message);
          }
        })
        callback();
      });
    },
    disabledCommands: ['AUTH', 'STARTTLS'],
});

server.listen(25);
}
