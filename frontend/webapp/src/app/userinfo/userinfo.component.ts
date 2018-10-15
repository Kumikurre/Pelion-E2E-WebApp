import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { UserInfo } from '../models';
import { Credentials } from '../../apikey';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  public userinfo;
  constructor(private userinfoService: UserinfoService) { }

  ngOnInit() {
    console.log(Credentials);
    this.getUserData();
  }

  getUserData() {
    this.userinfoService.getUserData().subscribe((data: UserInfo) => {this.userinfo = data; });
  }

  reloadData() {
    this.userinfoService.getUserData().subscribe(val => console.log(val));
    console.log(this.userinfoService.getUserData().subscribe(val => console.log(val)));
  }

  logStuff() {
    console.log('Logging...');
    console.log(this.userinfo);
  }

}
