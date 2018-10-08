import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../userinfo.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  public userinfo;
  constructor(private userinfoService: UserinfoService) { }

  ngOnInit() {
    this.userinfo = this.userinfoService.getUserData()
  }

  logStuff() {
    console.log('Logging...')
    console.log(this.userinfo)
  }
}
