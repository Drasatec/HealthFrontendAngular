import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';

import { FilterSystemComponent } from './components/filter-system/filter-system.component';

import { ThemeGeneralModule } from '../themegeneral.module';

@NgModule({
  declarations: [
    SystemComponent,
    FilterSystemComponent
  ],
  imports: [

    CommonModule,
    SystemRoutingModule,
    ThemeGeneralModule,
  ],
  exports:[
    FilterSystemComponent,
    ThemeGeneralModule,

  ]
})
export class SystemModule { }
