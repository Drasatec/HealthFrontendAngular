import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicsRoutingModule } from './clinics-routing.module';
import { ClinicsComponent } from './clinics.component';
import { AddClinicComponent } from './components/add-clinic/add-clinic.component';
import { AllClinicsComponent } from './components/all-clinics/all-clinics.component';
import { ViewClinicComponent } from './components/view-clinic/view-clinic.component';
import { SystemModule } from '../../system.module';


@NgModule({
  declarations: [
    ClinicsComponent,
    AddClinicComponent,
    AllClinicsComponent,
    ViewClinicComponent
  ],
  imports: [
    CommonModule,
    ClinicsRoutingModule,
    SystemModule
  ]
})
export class ClinicsModule { }
