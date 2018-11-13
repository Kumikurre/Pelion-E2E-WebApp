import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { apikey } from '../../apikey';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  public endpoints;
  public device;
  public str_id;
  private apiUrl = 'http://127.0.0.1:5000/Pelion_E2E_Api';
  constructor(private resourceservice: ResourceService,
              private route: ActivatedRoute,
              private location: Location,
              private http: HttpClient
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

  setSubscription(endpoint) {
    const re = /\//gi;
    const id = this.route.snapshot.paramMap.get('deviceid');
    this.str_id = id.replace(id, '_');
    const body = {'url': this.str_id};
    console.log(this.str_id);
    this.http.put(this.apiUrl + '/v2/subscriptions/' + id + endpoint, {
      headers: {
      'Authorization': apikey
    }});
    this.http.put(this.apiUrl + '/v2/notification/callback', body, {
      headers: {
      'Authorization': apikey
    }});
  }

  logStuff() {
    console.log(this.endpoints);
  }

  goBack(): void {
    this.location.back();
  }


}
