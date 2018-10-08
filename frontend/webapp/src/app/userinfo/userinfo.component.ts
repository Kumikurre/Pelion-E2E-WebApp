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
    this.getUserData()
  }

  getUserData(){
    this.userinfoService.getUserData().subscribe(val => console.log(val));
  }

  reloadData(){
    this.userinfo = this.userinfoService.getUserData()
    console.log(this.userinfoService.getUserData())
  }

  logStuff() {
    console.log('Logging...')
    console.log(this.userinfo)
  }
}
