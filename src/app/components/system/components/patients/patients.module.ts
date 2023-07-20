import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { AllPatientComponent } from './components/all-patient/all-patient.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SystemModule } from '../../system.module';
import { PatientTranslationComponent } from './patient-translation/patient-translation.component';


@NgModule({
  declarations: [
    PatientsComponent,
    AddPatientComponent,
    AllPatientComponent,
    PatientTranslationComponent,
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    RouterModule,
    HttpClientModule,
    SystemModule,
  ]
})
export class PatientsModule { }
