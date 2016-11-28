import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import fs from 'fs';
import mailx from 'mailx';
import config from '../webpack.config.dev';
import {listMailFolders, listMailMessages} from '../src/filehandler.js';


const port = 3000;
const app = express();
const compiler = webpack(config);

/* eslint-disable no-console */
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './index.html'));
});
app.get('/index.js', function(req, res){
  res.sendFile(path.join(__dirname, './index.js'));
});
app.get('/messages', function(req, res){
  res.send(listMailFolders());
});
app.get('/mbx/:mbx', function(req, res){
  res.send(listMailMessages(req.params.mbx));
});
app.get('/mbx/:mbx/:msgid', function(req, res){
  var rawMessage = fs.readFileSync(path.join(__dirname, `../messages/${req.params.mbx}/${req.params.msgid}`), 'UTF-8');
  mailx.parse(rawMessage, function(object, emailMessage){
      res.send(emailMessage.subject);
  })
});

app.listen(port, function(err) {
  if(err) {
    console.log(err);
  }
  else{
    open('http://localhost:' + port);
  }
}
);
