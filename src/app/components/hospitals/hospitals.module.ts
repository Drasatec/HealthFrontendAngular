import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalsRoutingModule } from './hospitals-routing.module';
import { HospitalsComponent } from './hospitals.component';

import { AddHospitalComponent } from './components/add-hospital/add-hospital.component';
import { AllHospitalsComponent } from './components/all-hospitals/all-hospitals.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ViewHospitalComponent } from './components/view-hospital/view-hospital.component';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { StopHospitalComponent } from './components/stop-hospital/stop-hospital.component';


@NgModule({
  declarations: [
    HospitalsComponent,
    AllHospitalsComponent,
    AddHospitalComponent,
    ViewHospitalComponent,
    StopHospitalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HospitalsRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class HospitalsModule { }
