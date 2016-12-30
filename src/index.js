import {HttpClient} from './httphandler.js';

var messages = [];

document.addEventListener('DOMContentLoaded', function() {
  // var asyncClient=new HttpClient();
  // asyncClient.get('/mailboxes', mailboxesLoaded);
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
}

function mailboxlinkClicked(evt){
  var coverpage = document.getElementById('coverpage');
  coverpage.classList.add('closed');
  var covercontent = document.getElementById('covercontent');
  covercontent.classList.add('hidden');

  var asyncClient=new HttpClient();
  asyncClient.get(`/mbx/${evt.target.innerHTML}`, messagesLoaded);
}

function messagesLoaded(response){
  messages = JSON.parse(response);
  var messagesHTML = `<table class='table'>`;
  messages.forEach((message) => {
    messagesHTML+=`<tr><td>${message.from.address}</td><td><a href='#' class='messagelink'>${message.subject}</a><input type='hidden' value='${message.messageId}'/></td><td>${message.date}</td></tr>`;
  });
  messagesHTML += `</table>`;
  document.getElementById("messages").parentElement.classList.remove('hidden');
  document.getElementById("messages").innerHTML = messagesHTML;
  document.getElementById("message").classList.add('hidden');
  var messagelinks = document.getElementsByClassName('messagelink');
  Array.from(messagelinks).forEach((messagelink)=>{
    messagelink.addEventListener('click', messagelinkClicked);
    });
}

function messagelinkClicked(evt){
  var selectedMessage = null;
  var messageTableRows = document.getElementsByTagName('tr');
  Array.from(messageTableRows).forEach((messageTableRow)=>{
    messageTableRow.classList.remove('active');
    });
  evt.target.parentElement.parentElement.classList.add('active');
  document.getElementById("message").classList.remove('hidden');
  messages.forEach((message)=>{
    if(message.messageId == evt.target.nextSibling.value){
      selectedMessage = message;
    }
  });
  document.getElementById("messageheaders").innerHTML = JSON.stringify(selectedMessage.headers);
  document.getElementById("messagemessageid").innerHTML = selectedMessage.messageId;
  document.getElementById("messagefrom").innerHTML = `${selectedMessage.from.name}&lt;<a href='mailto:${selectedMessage.from.address}'>${selectedMessage.from.address}</a>&gt;`;
  document.getElementById("messagesubject").innerHTML = selectedMessage.subject;
  document.getElementById("messagetext").innerHTML = `<pre>${selectedMessage.text}</pre>`;
  if(selectedMessage.html!=''){
    document.getElementById("messagehtml").innerHTML = selectedMessage.html;
  }
  else {
    document.getElementById("messagehtml").innerHTML = `<pre>${selectedMessage.text}</pre>`;
  }
  if (selectedMessage.date){
    document.getElementById("messagedate").innerHTML = selectedMessage.date;
  }
  else {
    document.getElementById("messagedate").innerHTML = '&nbsp;';
  }
  document.getElementById("messageattachments").innerHTML = selectedMessage.attachments;
  document.getElementById("messageto").innerHTML = '&nbsp;';
  selectedMessage.to.forEach((to)=>{
    document.getElementById("messageto").innerHTML += `${to.name}&lt;<a href='mailto:${to.address}'>${to.address}</a>&gt;`
  })
  document.getElementById("messagecc").innerHTML = '&nbsp;';
  selectedMessage.cc.forEach((cc)=>{
    document.getElementById("messagecc").innerHTML += `${cc.name}&lt;<a href='mailto:${cc.address}'>${cc.address}</a>&gt;`
  })
  document.getElementById("messagebcc").innerHTML = '&nbsp;';
  selectedMessage.bcc.forEach((bcc)=>{
    document.getElementById("messagebcc").innerHTML += `${bcc.name}&lt;<a href='mailto:${bcc.address}'>${bcc.address}</a>&gt;`
  })
}


