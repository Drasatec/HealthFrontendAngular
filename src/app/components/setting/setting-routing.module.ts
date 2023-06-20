import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';
import { RoomTypesComponent } from './components/room-types/room-types.component';

const routes: Routes = [
  { path: '', component: SettingComponent,children:[
    {path:'room-types',component:RoomTypesComponent},
    {path:'',redirectTo:'room-types',pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
