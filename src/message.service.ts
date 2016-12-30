import {Injectable} from '@angular/core';
import {Email} from './email';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService {
  constructor(private http: Http){}
  getMailboxes(): Promise<Email.Mailbox[]>
  {
    return this.http.get('/mailboxes')
        .toPromise()
        .then(response => response.json() as Email.Mailbox[])
    }
}
