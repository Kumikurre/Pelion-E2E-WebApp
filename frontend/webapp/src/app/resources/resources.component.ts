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
  public str_endpoint;
  public subscriptions;
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
    this.str_endpoint = endpoint.replace(re, '_');
    this.str_endpoint = this.str_endpoint.replace('_', '');
    console.log('last', this.str_endpoint);
    console.log('setting subscription', this.str_endpoint);
    const stuff = this.resourceservice.setSubscription(this.str_endpoint);
    console.log(stuff);
  }

  getSubscriptions() {
    console.log('getting all subscriptions');
    this.resourceservice.getSubscriptions().subscribe((subscriptions: any) => {this.subscriptions = subscriptions; });
  }

  logStuff() {
    console.log(this.endpoints);
  }

  goBack(): void {
    this.location.back();
  }

}
