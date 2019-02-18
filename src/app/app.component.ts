// angular default imports
import { Component } from '@angular/core';

// app constants and models
import { Stock } from './stock.model';
import { SharedConstants } from './shared/constants/shared.constants';
import { MarketPrice } from './shared/models/market-price.model';

// app services
import { SocketHandlerService } from './socket-handler.service';
import { StockService } from './stock.service';
import { SharedService } from './shared/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  stockArray = [];
  timeConstants = SharedConstants.TIME_CONSTANTS;
  marketPositions = [];
  selectedStock;
  constructor(private shService: StockService, private sharedService: SharedService) {
    //calling stock service to get stocks in [name,price] format
    shService.messages.subscribe(msg => {

      this.handleStocks(msg);
    });
  }

  //main function to handle stocks
  handleStocks(stockData) {
    //stockData is the current stock sent by websocket
    stockData.forEach(currentStock => {
      // check if stock already exists
      let indexOfStock = this.getStockIndexInArray(currentStock, this.stockArray);
      if (indexOfStock > -1) {
        //check if the current value of stock is higher than previous
        if (this.stockArray[indexOfStock].price - currentStock[1] < 0) {

          this.stockArray[indexOfStock].isCurrentValueMore = true;
          this.stockArray[indexOfStock].isCurrentValueLess = false;

        }
        else if (this.stockArray[indexOfStock].price - currentStock[1] > 0) {
          this.stockArray[indexOfStock].isCurrentValueMore = false;
          this.stockArray[indexOfStock].isCurrentValueLess = true;

        }
        //updating price of stock
        this.stockArray[indexOfStock].price = currentStock[1];
        //updating updation time for stock
        this.stockArray[indexOfStock].lastUpdated = this.setStockUpdateTime(this.stockArray[indexOfStock]);
        this.stockArray[indexOfStock].lastUpdatedTime = this.sharedService.formatTimeLocal();
        this.stockArray[indexOfStock].priceHistory.push(this.createShare(currentStock));
      }
      else {
        //if stock is a new entry, then creating it's entry in array
        let stock = new Stock();
        stock.name = currentStock[0];
        stock.price = currentStock[1];
        stock.isFirstValue = true;
        stock.lastUpdatedTime = this.sharedService.formatTimeLocal();
        stock.lastUpdated = this.sharedService.formatAMPM();
        stock.priceHistory = [];
        stock.priceHistory.push(this.createShare(currentStock));
        this.stockArray.push(stock);
      }
    });

  }

  //get index of stock in stock array
  getStockIndexInArray(obj, list) {
    let indexOfStock = list.findIndex(i => i.name === obj[0]);
    return indexOfStock;
  }


  //update stock time as per current entry
  setStockUpdateTime(stock) {
    let date = new Date();
    let h = date.getHours();
    let m: any = date.getMinutes();
    let stockTimeHour = stock.lastUpdatedTime.split(':')[0];
    let stockTimeMinutes = stock.lastUpdatedTime.split(':')[1];

    //check if the newest entry time is same as last updated time
    if (h == stockTimeHour && m == stockTimeMinutes) {
      //currently this value is hardcoded - can be made dynamic
      return this.timeConstants.UPDATED_NOW;
    }
    else {

      return this.sharedService.formatAMPM();
    }
  }

  showCurrentStockGraph(currentStock) {
    this.marketPositions = currentStock.priceHistory;
    this.selectedStock = currentStock.name;
  }

  createShare(stock) {
    let share = new MarketPrice();
    share.date = new Date();
    share.open = stock[1];
    return share;
  }
}