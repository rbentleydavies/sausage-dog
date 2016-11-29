import fs from 'fs';
import uuid from 'uuid';
import mailx from 'mailx';

function saveFile(from, to, message) {
  if(!fs.existsSync(`messages`)){
    fs.mkdirSync(`messages`);
  }
  if(!fs.existsSync(`messages/${to}`)){
    fs.mkdirSync(`messages/${to}`);
  }
  var filename=uuid();
  fs.writeFile(`messages/${to}/${filename}`, message, (err)=>{
    if(err) {
      return console.log(err)
      }
    console.log('email file was saved');
    });
}
function listMailFolders(req, res) {
  var retval = [];
  if(fs.existsSync(`messages`)){
    fs.readdirSync(`messages`).forEach((folder)=>{
      retval.push({name:folder});
  });
  };
  res.send(JSON.stringify(retval));
}
function listMailMessages(req, res) {
  var mailbox = req.params.mbx;
  var retval = [];
  if(fs.existsSync(`messages`) && fs.existsSync(`messages/${mailbox}`)){
    var messagesRaw = fs.readdirSync(`messages/${mailbox}`);
    messagesRaw.forEach((message)=>{
      var messageRaw = fs.readFileSync(`messages/${mailbox}/${message}`);
      mailx.parse(messageRaw, function(object, emailMessage){
        retval.push(emailMessage);
        if(retval.length==messagesRaw.length){
            res.send(JSON.stringify(retval));
        };
      });
    });
  };
};
export {saveFile, listMailFolders, listMailMessages}
