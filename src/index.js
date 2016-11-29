import {HttpClient} from './httphandler.js';

var messages = [];

document.addEventListener('DOMContentLoaded', function() {
  var asyncClient=new HttpClient();
  asyncClient.get('/mailboxes', mailboxesLoaded);
});

function mailboxesLoaded(response){
  var mailboxes = JSON.parse(response);
  var mailboxesHTML = `<ul>`;
  mailboxes.forEach((mailbox)=>{
    mailboxesHTML+=`<li><a href='#' class='mailboxlink'>${mailbox.name}</a></li>`;
  });
  mailboxesHTML += `</ul>`;
  document.getElementById("mailboxes").innerHTML = mailboxesHTML;
  var mailboxlinks = document.getElementsByClassName('mailboxlink');
  Array.from(mailboxlinks).forEach((mailboxlink)=>{
    mailboxlink.addEventListener('click', mailboxlinkClicked);
    });
};

function mailboxlinkClicked(evt){
      var asyncClient=new HttpClient();
      asyncClient.get(`/mbx/${evt.target.innerHTML}`, messagesLoaded);
}

function messagesLoaded(response){
  messages = JSON.parse(response);
  var messagesHTML = `<table>`;
  messages.forEach((message) => {
    messagesHTML+=`<tr><td>${message.from.address}</td><td><a href='#' class='messagelink'>${message.subject}</a><input type='hidden' value='${message.messageId}'/></td><td>${message.date}</td></tr>`;
  });
  messagesHTML += `</table>`;
  document.getElementById("messages").innerHTML = messagesHTML;
  document.getElementById("message").classList.add('hidden');
  var messagelinks = document.getElementsByClassName('messagelink');
  Array.from(messagelinks).forEach((messagelink)=>{
    messagelink.addEventListener('click', messagelinkClicked);
    });
} ;

function messagelinkClicked(evt){
  var asyncClient=new HttpClient();
  var selectedMessage = null;
  var messageTableRows = document.getElementsByTagName('tr');
  Array.from(messageTableRows).forEach((messageTableRow)=>{
    messageTableRow.classList.remove('selected');
    });
  evt.target.parentElement.parentElement.classList.add('selected');
  document.getElementById("message").classList.remove('hidden');
  messages.forEach((message)=>{
    if(message.messageId == evt.target.nextSibling.value){
      selectedMessage = message;
    }
  });
  document.getElementById("messageheaders").innerHTML = JSON.stringify(selectedMessage.headers);
  document.getElementById("messagemessageid").innerHTML = selectedMessage.messageId;
  document.getElementById("messagefrom").innerHTML = JSON.stringify(selectedMessage.from);
  document.getElementById("messagesubject").innerHTML = selectedMessage.subject;
  document.getElementById("messagetext").innerHTML = `<pre>${selectedMessage.text}</pre>`;
  document.getElementById("messagehtml").innerHTML = selectedMessage.html;
  document.getElementById("messagedate").innerHTML = selectedMessage.date;
  document.getElementById("messageattachments").innerHTML = selectedMessage.attachments;
  document.getElementById("messageto").innerHTML = JSON.stringify(selectedMessage.to);
  document.getElementById("messagecc").innerHTML = JSON.stringify(selectedMessage.cc);
  document.getElementById("messagebcc").innerHTML = JSON.stringify(selectedMessage.bcc);


  //asyncClient.get(`/mbx/${evt.target.innerHTML}/`, messageLoaded);
}

function messageLoaded(response){
  document.getElementById("message").innerHTML = response;
}
