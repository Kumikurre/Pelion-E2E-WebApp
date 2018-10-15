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
    console.log('Device init');
    this.getDevices();
  }

  getDevices() {
    this.deviceservice.getDevices().subscribe((data: Devices) => {this.devicelist = data; });
    console.log('GetDevices');
  }

  logStuff() {
    console.log(this.devicelist);
  }
}
