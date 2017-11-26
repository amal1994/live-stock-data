import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SocketHandlerService } from './socket-handler.service';
import { StockService } from './stock.service';
import { AppComponent } from './app.component';

//datatable plugin import
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap'; 
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    TabsModule
  ],
  providers: [ SocketHandlerService, StockService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
