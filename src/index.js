import {HttpClient} from './httphandler.js';

document.addEventListener('DOMContentLoaded', function() {
  var asyncClient=new HttpClient();
  asyncClient.get('/messages', function(response){
    document.getElementById("messages").innerHTML = response;
    var mailboxlinks = document.getElementsByClassName('mailboxlink');
    Array.from(mailboxlinks).forEach((mailboxlink)=>{
      mailboxlink.addEventListener('click',function(){

      asyncClient.get(`/mbx/${mailboxlink.innerHTML}`, function(response){
        document.getElementById("messages").innerHTML = response;

        var messagelinks = document.getElementsByClassName('mailboxlink');
    Array.from(messagelinks).forEach((messagelink)=>{
      messagelink.addEventListener('click',function(){
        asyncClient.get(`/mbx/${messagelink.innerHTML}/`, function(response){
        document.getElementById("messages").innerHTML = response;
      });
    });
    });
  });
      });
    });
  });
});
