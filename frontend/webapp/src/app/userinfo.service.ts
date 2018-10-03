import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders({
      'Authorization':
  });

  apiUrl = "https://api.us-east-1.mbedcloud.com/v3/devices/";
  H = "Authorization: Bearer ak_1MDE2NWM3YzQ5ZDVlMGEzN2UzYzYwODJmMDAwMDAwMDA016619a9c2fd2200d95670ee00000000awMhr7voDwFFHRNqjOpVKW38FcJN7r02"

  getUserData() {
    return this.http.get(this.apiUrl + "/v3/accounts/me",);
  }
}
