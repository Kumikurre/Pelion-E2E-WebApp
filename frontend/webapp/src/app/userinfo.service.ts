import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from './models';
import { Credentials } from '../apikey';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({'Authorization': 'Bearer PUT KEY HERE'});
  private apiUrl = "https://api.us-east-1.mbedcloud.com/v3/devices/";

  getUserData() {
    return this.http.get(this.apiUrl + "/v3/accounts/me",{headers: {'Authorization': 'Bearer ak_1MDE2NWM3YzQ5ZDVlMGEzN2UzYzYwODJmMDAwMDAwMDA016619a9c2fd2200d95670ee00000000awMhr7voDwFFHRNqjOpVKW38FcJN7r02'}});
  }
}
