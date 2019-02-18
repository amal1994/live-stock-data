import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { SharedModule } from './shared/shared.module';

import { SocketHandlerService } from './socket-handler.service';
import { StockService } from './stock.service';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    SharedModule
  ],
  providers: [ SocketHandlerService, StockService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
