import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  //lineChart
  public devicelist: any;
  public device_id: string;

  public pollingData:any;
  public lineChartData:Array<any>;
  public lineChartLabels:any;
  public lineChartOptions:any = {
    responsive: true
  };
  private apiUrl = 'http://127.0.0.1:5000/Pelion_E2E_Api';

  constructor(private http: HttpClient, 
              private data: DataService) {

    this.pollingData = Observable.interval(60000)
    .switchMap(() => http.get(this.apiUrl + '/results' + '/' + this.device_id)).map((data) => data)
        .subscribe((data) => {
          this.lineChartData=data;
        
          console.log(this.lineChartData);
        });
   }

  refresh() {
    this.getResources().subscribe((data: any) => {
          this.lineChartData=data;
          this.lineChartLabels = Object.keys(this.lineChartData);
          console.log(this.lineChartLabels)
          this.lineChartLabels.forEach(element => {
            console.log(this.lineChartData[element])
            this.lineChartData[element]['payload'].push({"label":element})
            console.log(this.lineChartData[element])
            
          });
        });

  }

  getResources() {
    return this.http.get(this.apiUrl + '/results' + '/' + this.device_id);
  }
  
  ngOnInit() {
    this.data.currentDeviceList.subscribe(devicelist => this.devicelist = devicelist)
  }


  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  onSelect(deviceId) { 
    this.device_id = deviceId
  }

}



// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-graph',
//   templateUrl: './graph.component.html',
//   styleUrls: ['./graph.component.css']
// })
// export class GraphComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
