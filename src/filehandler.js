import fs from 'fs';
import uuid from 'uuid';

function saveFile(from, to, message) {
  if(!fs.existsSync(`messages`))
  {
    fs.mkdirSync(`messages`);
  }
  if(!fs.existsSync(`messages/${to}`))
  {
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
function listMailFolders() {
  if(!fs.existsSync(`messages`))
  {
    return `No message received`;
  }
  var messageFolderList = '<ul>';
  fs.readdirSync(`messages`).forEach((folder)=>{
    messageFolderList += `<li><a href='#' class='mailboxlink'>${folder}</a></li>`;
  });
  messageFolderList += '</ul>';
  return messageFolderList;

}
function listMailMessages(mailbox) {
  if(!fs.existsSync(`messages`))
  {
    return `No message received`;
  }
  if(!fs.existsSync(`messages/${mailbox}`))
  {
    return `No message received`;
  }
  var messagesList = '<ul>';
  fs.readdirSync(`messages/${mailbox}`).forEach((message)=>{
    messagesList += `<li><a href='#' class='messagelink'>${mailbox}/${message}</a></li>`;
  });
  messagesList += '</ul>';
  return messagesList;

}
export {saveFile, listMailFolders, listMailMessages}
