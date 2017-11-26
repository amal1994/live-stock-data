import { Component } from '@angular/core';
import { Stock } from './stock.model';
import { SocketHandlerService } from './socket-handler.service';
import { StockService } from './stock.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  stockArray = [];


  constructor(private shService: StockService) {
    //calling stock service to get stocks in [name,price] format
    shService.messages.subscribe(msg => {

      this.handleStocks(msg);
    });
  }

  //main function to handle stocks
  handleStocks(stockData) {
    //stockData is the current stock sent by websocket
    stockData.forEach(element => {

      if (this.isStockAlreadyExists(element, this.stockArray)) {
        //get index of stock
        let indexOfStock = this.getStockIndexInArray(element, this.stockArray);

        //check if the current value of stock is higher than previous
        if (this.stockArray[indexOfStock].price - element[1] < 0) {

          this.stockArray[indexOfStock].isCurrentValueMore = true;
          this.stockArray[indexOfStock].isCurrentValueLess = false;

        }
        else if (this.stockArray[indexOfStock].price - element[1] > 0) {
          this.stockArray[indexOfStock].isCurrentValueMore = false;
          this.stockArray[indexOfStock].isCurrentValueLess = true;

        }
        //updating price of stock
        this.stockArray[indexOfStock].price = element[1];
        //updating updation time for stock
        this.stockArray[indexOfStock].lastUpdated = this.setStockUpdateTime(this.stockArray[indexOfStock]);
        this.stockArray[indexOfStock].lastUpdatedTime = this.formatTimeLocal();
      }
      else {
        //if stock is a new entry, then creating it's entry in array
        let stock = new Stock();
        stock.name = element[0];
        stock.price = element[1];
        stock.isFirstValue = true;
        stock.lastUpdatedTime = this.formatTimeLocal();
        stock.lastUpdated = this.formatAMPM();
        this.stockArray.push(stock);
      }
    });

  }

  //to check if the stock already exists in the Stock array
  isStockAlreadyExists(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].name == obj[0]) {
        return true;
      }
    }

    return false;
  }

  //get index of stock in stock array
  getStockIndexInArray(obj, list) {
    let indexOfStock = list.findIndex(i => i.name === obj[0]);
    return indexOfStock;
  }

  //convert default time in the format hh:mm:ss
  formatTimeLocal() {
    let dt = new Date();
    return dt.toLocaleTimeString();
  }

  //convert time in 12 hour format
  formatAMPM() {
    let date = new Date();
    let hours = date.getHours();
    let minutes: any = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
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
      return "Few seconds ago";
    }
    else {

      return this.formatAMPM();
    }
  }
}