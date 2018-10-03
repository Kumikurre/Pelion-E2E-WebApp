import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserinfoService {

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({'Authorization': 'Bearer PUT KEY HERE'});
  private apiUrl = "https://api.us-east-1.mbedcloud.com/v3/devices/";

  getUserData() {
    return this.http.get(this.apiUrl + "/v3/accounts/me",{headers: {'Authorization': ''}});
  }
}
