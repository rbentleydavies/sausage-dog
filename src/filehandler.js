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

export {saveFile}
