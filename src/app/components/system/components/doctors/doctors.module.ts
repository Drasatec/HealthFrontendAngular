import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import { AllDoctorComponent } from './components/all-doctor/all-doctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { FilterSystemComponent } from '../filter-system/filter-system.component';
import { SystemModule } from '../../system.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { NbRouteTabsetModule, NbTabsetModule } from '@nebular/theme';
import { BasicInfoComponent } from './components/add-doctor/partials/basic-info/basic-info.component';
import { FilesUploadComponent } from './components/add-doctor/partials/files-upload/files-upload.component';
import { JobInfoComponent } from './components/add-doctor/partials/job-info/job-info.component';
import { AccountInfoComponent } from './components/add-doctor/partials/account-info/account-info.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DoctorsComponent,
    AllDoctorComponent,
    AddDoctorComponent,
    BasicInfoComponent,
    FilesUploadComponent,
    JobInfoComponent,
    AccountInfoComponent,
  ],
  imports: [
    CommonModule,
    SystemModule,
    DoctorsRoutingModule,
    HttpClientModule,
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
    NbRouteTabsetModule,
    NbTabsetModule,
    MatSelectModule,
    SystemModule,
    NgbDatepickerModule
  ]
})
export class DoctorsModule { }
