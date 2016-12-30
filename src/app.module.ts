import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../src/app.component';
import {MessageService} from '../src/message.service';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [BrowserModule,HttpModule],
  declarations: [AppComponent],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
