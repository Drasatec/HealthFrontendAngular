import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingsRoutingModule } from './buildings-routing.module';
import { BuildingsComponent } from './buildings.component';
import { AllBuildingsComponent } from './components/all-buildings/all-buildings.component';
import { AddBuildingComponent } from './components/add-building/add-building.component';
import { ViewBuildingComponent } from './components/view-building/view-building.component';
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
import { HospitalsModule } from '../hospitals/hospitals.module';


@NgModule({
  declarations: [
    BuildingsComponent,
    AllBuildingsComponent,
    AddBuildingComponent,
    ViewBuildingComponent
  ],
  imports: [
    CommonModule,
    BuildingsRoutingModule,
    HospitalsModule,
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
    NgSelectModule
  ]
})
export class BuildingsModule { }
