import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  Holly = [];

  sendData(input) {
    this.Holly = input;
    console.log(this.Holly);
  }

  receiveData() {
    return this.Holly;
  }





}
