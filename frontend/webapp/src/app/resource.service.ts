import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Devices } from './models';
import { apikey } from '../apikey';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({'Authorization': apikey});
  private apiUrl = 'http://127.0.0.1:5000/Pelion_E2E_Api';

  getResources(deviceid) {
    return this.http.get(this.apiUrl + '/endpoints/' + deviceid, {
      headers: {
      'Authorization': apikey
    }});
  }

  setSubscription(deviceid, endpoint) {
    console.log('PUT to this URL: ', this.apiUrl + '/subscriptions/' + deviceid + '/' + endpoint);
    return this.http.put(this.apiUrl + '/subscriptions/' + deviceid + '/' + endpoint, {
      headers: {
      'Authorization': apikey
    }});
  }

  getSubscriptions(device_id) {
    return this.http.get(this.apiUrl + '/subscriptions/' + device_id, {
      headers: {
      'Authorization': apikey
    }});
  }

  deleteSubscription(deviceid, endpoint) {
    console.log('DELETE CALLED', deviceid, endpoint)
    var asd = this.http.delete(this.apiUrl + '/subscriptions/' + deviceid + '/' + endpoint, {
      headers: {
      'Authorization': apikey
    }});
    console.log(asd)
    return asd;
  }

}


