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
  private apiUrl = 'http://127.0.0.1:5000/Pelion_E2E_Api';

  getUserData() {
    return this.http.get(this.apiUrl + '/account/me', {
      headers: {
      'Authorization': 'Bearer ak_1MDE2NWM3YzQ5ZDVlMGEzN2UzYzYwODJmMDAwMDAwMDA016619a9c2fd2200d95670ee00000000awMhr7voDwFFHRNqjOpVKW38FcJN7r02'
    }});
  }
}
