import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalsRoutingModule } from './hospitals-routing.module';
import { HospitalsComponent } from './hospitals.component';
import { AllHospitalsComponent } from './components/all-hospitals/all-hospitals.component';
import { AddHospitalComponent } from './components/add-hospital/add-hospital.component';
import { ViewHospitalComponent } from './components/view-hospital/view-hospital.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';

import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SystemModule } from '../../system.module';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HospitalsComponent,
    AllHospitalsComponent,
    AddHospitalComponent,
    ViewHospitalComponent,
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    CommonModule,
    HospitalsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    NgSelectModule,
    MatSelectModule,
    SystemModule,
    MatProgressSpinnerModule,
    MatInputModule
  ]
})
export class HospitalsModule { }
