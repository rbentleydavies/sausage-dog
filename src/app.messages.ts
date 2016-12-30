import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { OnInit } from '@angular/core';
import { Email } from './email';
import { Observable } from 'rxjs';

@Component({
  selector: 'messages',
  template: `
  <table class='table'>
  <tr *ngFor='let message of messages | async'><td>{{message.from.address}}</td><td><a href='#' class='messagelink'>{{message.subject}}</a>
      <input type='hidden' value='{{message.messageId}}'/></td><td>{{message.date}}</td></tr>
  </table>
  `
})
export class MessageComponent implements OnInit{
  messages: Observable<Email.Message[]>;
  constructor(private messageService : MessageService){
  }
  ngOnInit() : void{
    this.messages = this.messageService.getMessages('caroline@bentley-davies.co.uk');
  }

}
