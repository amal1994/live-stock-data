import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SocketHandlerService } from './socket-handler.service';
import { StockService } from './stock.service';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ SocketHandlerService, StockService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
