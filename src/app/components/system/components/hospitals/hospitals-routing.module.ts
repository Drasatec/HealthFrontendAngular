import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalsComponent } from './hospitals.component';
import { AddHospitalComponent } from './components/add-hospital/add-hospital.component';
import { AllHospitalsComponent } from './components/all-hospitals/all-hospitals.component';
import { ViewHospitalComponent } from './components/view-hospital/view-hospital.component';

const routes: Routes = [
  { path: '', component: HospitalsComponent,
    children:[
      {path:'add-hospital',component : AddHospitalComponent},
      {path:'edit-hospital/:id',component : AddHospitalComponent},
      {path:'all-hospital',component : AllHospitalsComponent},
      {path:'view-hospital/:id',component : ViewHospitalComponent},
      {path: '',redirectTo: "all-hospital",pathMatch:'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalsRoutingModule { }
