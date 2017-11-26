import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { SocketHandlerService } from './socket-handler.service';

export interface Message {
  name: string,
  price: string
}
const STOCK_URL = 'ws://stocks.mnet.website';

@Injectable()
export class StockService {

  public messages: Subject<Message>;

  //service to send current stock data returned from websocket
  
  constructor(shService: SocketHandlerService) {
		this.messages = <Subject<Message>>shService
			.connect(STOCK_URL)
			.map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
				return data;
			});
	}

}







