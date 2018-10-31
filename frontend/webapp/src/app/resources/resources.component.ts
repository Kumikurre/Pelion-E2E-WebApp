import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { apikey } from '../../apikey';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  public endpoints;
  public device;
  constructor(private resourceservice: ResourceService,
              private route: ActivatedRoute,
              private location: Location
              ) { }

  ngOnInit() {
    this.getResources();
  }

  getResources() {
    // Pulls the current resources from the API. Assigns return value to this.resources
    const id = this.route.snapshot.paramMap.get('deviceid');
    this.device = this.route.snapshot.paramMap.get('deviceid');
    this.resourceservice.getResources(id).subscribe((endpoints: any) => {this.endpoints = endpoints; });
  }

  logStuff() {
    console.log(this.endpoints);
  }

  goBack(): void {
    this.location.back();
  }


}
