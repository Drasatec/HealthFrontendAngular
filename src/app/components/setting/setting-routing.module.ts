import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';
import { RoomTypesComponent } from './components/room-types/room-types.component';
import { VisitTypesComponent } from './components/visit-types/visit-types.component';
import { SsnTypesComponent } from './components/ssn-types/ssn-types.component';
import { PeriodTypesComponent } from './components/period-types/period-types.component';
import { NationalityComponent } from './components/nationality/nationality.component';

const routes: Routes = [
  { path: '', component: SettingComponent,children:[
    {path:'room-types',component:RoomTypesComponent},
    {path:'visit-types',component:VisitTypesComponent},
    {path:'ssn-types',component:SsnTypesComponent},
    {path:'working-period',component:PeriodTypesComponent},
    {path:'nationality',component:NationalityComponent},

    {path:'',redirectTo:'room-types',pathMatch:'full'},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
