import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders();
  this.headers = this.headers.set('')

  this.apiUrl = "https://api.us-east-1.mbedcloud.com/v3/devices/";

  getUserData() {
    return this.http.get(this.apiUrl + "/v3/accounts/me",);
  }
}
