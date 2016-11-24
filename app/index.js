'use strict';

var _httphandler = require('../src/httphandler.js');

document.addEventListener('DOMContentLoaded', function () {
  var asyncClient = new _httphandler.HttpClient();
  asyncClient.get('/messages', function (response) {
    document.getElementById("messages").innerHTML = response;
  });
});