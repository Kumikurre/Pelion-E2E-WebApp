import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DeviceComponent } from './device/device.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { AppRoutingModule } from './app-routing.module';
import { ResourcesComponent } from './resources/resources.component';
import { GraphComponent } from './graph/graph.component';
import { ChartsModule } from 'ng2-charts';
import { DataService } from './data.service';
import { ResourceService } from './resource.service';
import { DeviceService } from './device.service';


@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    UserinfoComponent,
    ResourcesComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [DataService, ResourceService, DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
