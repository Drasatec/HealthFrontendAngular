import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { AllDoctorComponent } from './components/all-doctor/all-doctor.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';

const routes: Routes = [
  { path: '', component: DoctorsComponent,
    children:[
      {path:'all-doctor',component : AllDoctorComponent},
      {path:'add-doctor',component : AddDoctorComponent},

      {path: '',redirectTo: "all-doctor",pathMatch:'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
