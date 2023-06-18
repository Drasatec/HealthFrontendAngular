import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialitiesRoutingModule } from './specialities-routing.module';
import { SpecialitiesComponent } from './specialities.component';
import { AddSpecialComponent } from './components/add-special/add-special.component';
import { ViewSpecialComponent } from './components/view-special/view-special.component';
import { AllSpecialsComponent } from './components/all-specials/all-specials.component';
import { SystemModule } from '../../system.module';


@NgModule({
  declarations: [
    SpecialitiesComponent,
    AddSpecialComponent,
    ViewSpecialComponent,
    AllSpecialsComponent
  ],
  imports: [
    CommonModule,
    SpecialitiesRoutingModule,
    SystemModule
  ]
})
export class SpecialitiesModule { }
