import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { AllRoomsComponent } from './components/all-rooms/all-rooms.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { ViewRoomComponent } from './components/view-room/view-room.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SystemModule } from '../../system.module';


@NgModule({
  declarations: [
    RoomsComponent,
    AllRoomsComponent,
    AddRoomComponent,
    ViewRoomComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    SystemModule,
    RouterModule,
    HttpClientModule,
  ]
})
export class RoomsModule { }
