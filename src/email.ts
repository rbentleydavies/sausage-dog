

export module Email{
  export class Mailbox{
    name : string = '';
  }
  export class Address {
    name = '';
    address = '';
}
export class Attachment {
  data : string = '';
  fileName : string = 'unnamed';
  content : string = null;
  encoding = 'base64';
  size = 0;
  cid : string = null;
}
export class Message{
  headers = {};
  messageId = '';
  from = new Address();
  subject = '';
  html = '';
  text = '';
  size = 0;
  date : Date = null;
  attachments : Attachment[] = [];
  to : Address[] = [];
  cc : Address[] = [];
  bcc : Address[] = [];
  seqNumber : string = null;
  uid : string = null;
}
}
