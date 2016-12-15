import express from 'express';
import path from 'path';
import open from 'open';
import fs from 'fs';
import mailx from 'mailx';

import {listMailFolders, listMailMessages} from './filehandler.js';
export default function startwebserver(port){
  const app = express();
  app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './index.html'));
  });
  app.get('/index.js', function(req, res){
    res.sendFile(path.join(__dirname, './index.js'));
  });

  configureWebService(app);
  app.listen(port, function(err) {
    if(err) {
      console.log(err);
    }
    else{
      open('http://localhost:' + port);
    }
  }
  );
}
function configureWebService(app){
  app.get('/bootstrap.css', function(req, res){
    res.sendFile(path.join(__dirname, './bootstrap.css'));
  });
  app.get('/mailboxes', function(req, res){
    listMailFolders(req, res);
  });
  app.get('/mbx/:mbx', function(req, res){
    listMailMessages(req, res);
  });
  app.get('/mbx/:mbx/:msgid', function(req, res){
    var rawMessage = fs.readFileSync(path.join(__dirname, `../messages/${req.params.mbx}/${req.params.msgid}`), 'UTF-8');
    mailx.parse(rawMessage, function(object, emailMessage){
        res.send(emailMessage.subject);
    })

  });
}
export {configureWebService}
