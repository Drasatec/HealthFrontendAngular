import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { AllRoomsComponent } from './components/all-rooms/all-rooms.component';
import { ViewRoomComponent } from './components/view-room/view-room.component';

const routes: Routes = [
  { path: '', component: RoomsComponent,children:[
    {path:'add-room',component : AddRoomComponent},
    {path:'all-room',component : AllRoomsComponent},
    {path:'view-room/:id',component : ViewRoomComponent},
    {path: '',redirectTo: "all-room",pathMatch:'full'},
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
