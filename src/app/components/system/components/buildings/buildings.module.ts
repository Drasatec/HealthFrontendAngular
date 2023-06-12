import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingsRoutingModule } from './buildings-routing.module';
import { BuildingsComponent } from './buildings.component';
import { AddBuildingComponent } from './components/add-building/add-building.component';
import { SystemModule } from '../../system.module';
import { AllBuildingsComponent } from './components/all-buildings/all-buildings.component';
import { ViewBuildingComponent } from './components/view-building/view-building.component';
import { AddBuildTranslateComponent } from './components/add-build-translate/add-build-translate.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HospitalsModule } from '../hospitals/hospitals.module';


@NgModule({
  declarations: [
    BuildingsComponent,
    AddBuildingComponent,
    AllBuildingsComponent,
    ViewBuildingComponent,
    AddBuildTranslateComponent,
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    CommonModule,
    BuildingsRoutingModule,
    SystemModule,
    HospitalsModule
  ],
  exports:[
    AddBuildingComponent,
  ]
})
export class BuildingsModule { }
