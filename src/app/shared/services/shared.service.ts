import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  constructor() { }

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
}
