import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalsRoutingModule } from './hospitals-routing.module';
import { HospitalsComponent } from './hospitals.component';
import { AllHospitalsComponent } from './components/all-hospitals/all-hospitals.component';
import { AddHospitalComponent } from './components/add-hospital/add-hospital.component';
import { ViewHospitalComponent } from './components/view-hospital/view-hospital.component';
import { HttpClientModule } from '@angular/common/http';
import { SystemModule } from '../../system.module';
import { RouterModule } from '@angular/router';
import { AddInfoTranslateComponent } from './components/add-info-translate/add-info-translate.component';


@NgModule({
  declarations: [
    HospitalsComponent,
    AllHospitalsComponent,
    AddHospitalComponent,
    ViewHospitalComponent,
    AddInfoTranslateComponent,
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    CommonModule,
    HospitalsRoutingModule,
    SystemModule,
  ],
  exports:[
    AddHospitalComponent,
  ]
})
export class HospitalsModule { }
