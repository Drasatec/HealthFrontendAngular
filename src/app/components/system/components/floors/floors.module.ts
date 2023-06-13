import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloorsRoutingModule } from './floors-routing.module';
import { FloorsComponent } from './floors.component';
import { AllFloorsComponent } from './components/all-floors/all-floors.component';
import { AddFloorComponent } from './components/add-floor/add-floor.component';
import { ViewFloorComponent } from './components/view-floor/view-floor.component';
import { SystemModule } from '../../system.module';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BuildingsModule } from '../buildings/buildings.module';


@NgModule({
  declarations: [
    FloorsComponent,
    AllFloorsComponent,
    AddFloorComponent,
    ViewFloorComponent
  ],
  imports: [
    CommonModule,
    FloorsRoutingModule,
    SystemModule,
    RouterModule,
    HttpClientModule,
    BuildingsModule
  ]
})
export class FloorsModule { }
