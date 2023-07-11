import { combineLatest } from 'rxjs';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorssComponent } from './doctorss.component';
import { AllDoctorssComponent } from './components/all-doctorss/all-doctorss.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';

const routes: Routes = [
  { path: '', component: DoctorssComponent,
    children:[
      {path:'all-doctors',component:AllDoctorssComponent},
      {path:'doctor-profile/:id',component:DoctorProfileComponent},
      {path:'',pathMatch:'full',redirectTo:'all-doctors'},
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorssRoutingModule { }
