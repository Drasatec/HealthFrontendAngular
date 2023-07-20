import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { AllPatientComponent } from './components/all-patient/all-patient.component';

const routes: Routes = [
  { path: '', component: PatientsComponent,
  children:[
    {path:'add-patient',component : AddPatientComponent},
    {path:'edit-patient/:id',component : AddPatientComponent},
    {path:'all-patient',component : AllPatientComponent},
    {path: '',redirectTo: "all-patient",pathMatch:'full'},
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
