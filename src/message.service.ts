import {Injectable} from '@angular/core';
import {Email} from './email';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class MessageService {
  constructor(private http: Http){}
  getMailboxes(): Promise<Email.Mailbox[]>
  {
    return this.http.get('/mailboxes')
        .toPromise()
        .then(response => response.json() as Email.Mailbox[])
    }

    getMessages(mailbox : string): Observable<Email.Message[]>
    {
      return this.http.get(`/mbx/${mailbox}`).map(response => response.json() as Email.Message[]);
    }
}
