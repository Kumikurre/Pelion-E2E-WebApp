import { Component, OnInit } from '@angular/core';
import { Devices } from '../models';
import { ResourceService } from '../resource.service';
import { apikey } from '../../apikey';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  public endpoints;
  public device;
  constructor(private resourceservice: ResourceService) { }

  ngOnInit() {
    this.getResources();
  }

  getResources() {
    // Pulls the current devices from the API. Assigns return value to this.devicelist
    this.resourceservice.getResources(this.device.id).subscribe((endpoints: any) => {this.endpoints = endpoints; });
  }

}
