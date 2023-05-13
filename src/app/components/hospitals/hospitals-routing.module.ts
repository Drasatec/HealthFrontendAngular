import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalsComponent } from './hospitals.component';
import { AllHospitalsComponent } from './components/all-hospitals/all-hospitals.component';
import { AddHospitalComponent } from './components/add-hospital/add-hospital.component';

const routes: Routes = [
  { path: '', component: AllHospitalsComponent },
  {path:'add-hospital',component : AddHospitalComponent},
  {path:'all-hospital',component : AllHospitalsComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalsRoutingModule { }
