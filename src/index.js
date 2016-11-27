import {HttpClient} from './httphandler.js';

document.addEventListener('DOMContentLoaded', function() {
  var asyncClient=new HttpClient();
  asyncClient.get('/messages', function(response){
    document.getElementById("messages").innerHTML = response;
  })

});
