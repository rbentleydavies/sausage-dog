import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { OnInit } from '@angular/core';
import { Email } from './email';
@Component({
  selector: 'mailboxes',
  template: `
  <li><a href='#' class='btn btn-lg btn-default'>Select Mailbox</a>
  <span id='mailboxes'>
  <ul>
  <li *ngFor='let mailbox of mailboxes'><a href='#' class='mailboxlink' (click)="getMessages(mailbox.name)">{{mailbox.name}}</a></li>
  </ul>
  </span>
  </li>
  `
})
export class AppComponent implements OnInit{
  name = 'Angular';
  mailboxes: Email.Mailbox[] = [];
  constructor(private messageService : MessageService){
  }
  ngOnInit() : void{
    this.messageService.getMailboxes().then(mailboxes => this.mailboxes = mailboxes);
  }
  getMessages(mailbox : string) {
    var coverpage = document.getElementById('coverpage');
    coverpage.classList.add('closed');
    var covercontent = document.getElementById('covercontent');
    covercontent.classList.add('hidden');
    document.getElementById("messages").parentElement.classList.remove('hidden');
  }
}
