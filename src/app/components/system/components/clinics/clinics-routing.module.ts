import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicsComponent } from './clinics.component';
import { AddClinicComponent } from './components/add-clinic/add-clinic.component';
import { AllClinicsComponent } from './components/all-clinics/all-clinics.component';
import { ViewClinicComponent } from './components/view-clinic/view-clinic.component';

const routes: Routes = [
  { path: '', component: ClinicsComponent,children:[
    {path:'add-clinic',component : AddClinicComponent},
    {path:'all-clinic',component : AllClinicsComponent},
    {path:'view-clinic/:id',component : ViewClinicComponent},
    {path: '',redirectTo: "all-clinic",pathMatch:'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicsRoutingModule { }
