import express from 'express';
import path from 'path';
import open from 'open';
import {listMailFolders} from './filehandler.js';
export default function startwebserver(port){
const app = express();

/* eslint-disable no-console */
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './index.html'));
});
app.get('/index.js', function(req, res){
  res.sendFile(path.join(__dirname, './index.js'));
});
app.get('/messages', function(req, res){
  res.send(listMailFolders());
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
}
