import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../src/app.component';
import {MessageComponent} from '../src/app.messages';
import {MessageService} from '../src/message.service';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [BrowserModule,HttpModule],
  declarations: [AppComponent, MessageComponent],
  providers: [MessageService],
  bootstrap: [AppComponent, MessageComponent]
})
export class AppModule {}
