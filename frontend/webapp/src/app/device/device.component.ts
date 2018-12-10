import { Component, OnInit } from '@angular/core';
import { Devices } from '../models';
import { DeviceService } from '../device.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { apikey } from '../../apikey';
import { DataService } from '../data.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  public devicelist: any;
  constructor(private deviceservice: DeviceService,
              private data: DataService) { }

  ngOnInit() {
    // Get devices on init
    this.data.currentDeviceList.subscribe(devicelist => this.devicelist = devicelist)

    this.getDevices();
  }

  getDevices() {
    // Pulls the current devices from the API. Assigns return value to this.devicelist
    this.deviceservice.getDevices().subscribe((data: Devices) => {this.devicelist = data; this.data.changeMessage(this.devicelist); });
  }

  reloadData() {
    // Executes getDevices again
    this.deviceservice.getDevices().subscribe((data: Devices) => {this.devicelist = data; });
  }

  logStuff() {
    // Test function for logging devicelist to console
    console.log(this.devicelist);
  }
}
