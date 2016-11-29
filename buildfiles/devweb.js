import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import fs from 'fs';
import mailx from 'mailx';
import config from '../webpack.config.dev';
import {listMailFolders, listMailMessages} from '../src/filehandler.js';
import {configureWebService} from '../src/startwebserver.js';

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
  res.sendFile(path.join(__dirname, '../src/index.js'));
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
