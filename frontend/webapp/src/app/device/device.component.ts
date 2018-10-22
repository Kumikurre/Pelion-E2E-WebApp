import { Component, OnInit } from '@angular/core';
import { Devices } from '../models';
import { DeviceService } from '../device.service';
import { apikey } from '../../apikey';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  public devicelist;
  constructor(private deviceservice: DeviceService) { }

  ngOnInit() {
    // Get devices on init
    this.getDevices();
  }

  getDevices() {
    // Pulls the current devices from the API. Assigns return value to this.devicelist
    this.deviceservice.getDevices().subscribe((data: Devices) => {this.devicelist = data; });
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
