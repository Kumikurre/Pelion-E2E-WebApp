import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private deviceListSource = new BehaviorSubject('a');
  currentDeviceList = this.deviceListSource.asObservable();

  constructor() { }

  changeMessage(message: any) {
    console.log('message changed: ', message)
    this.deviceListSource.next(message)
  }

}