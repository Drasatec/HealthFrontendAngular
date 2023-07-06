import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { ThemeGeneralModule } from '../themegeneral.module';
import { RoomTypesComponent } from './components/room-types/room-types.component';
import { TranslationTypesComponent } from './components/translation-types/translation-types.component';
import { SystemModule } from '../system/system.module';
import { AddRoomtypesComponent } from './components/room-types/add-roomtypes/add-roomtypes.component';
import { VisitTypesComponent } from './components/visit-types/visit-types.component';
import { AddVisittypesComponent } from './components/visit-types/add-visittypes/add-visittypes.component';
import { SsnTypesComponent } from './components/ssn-types/ssn-types.component';
import { AddSsntypesComponent } from './components/ssn-types/add-ssntypes/add-ssntypes.component';
import { PeriodTypesComponent } from './components/period-types/period-types.component';
import { AddPeriodtypesComponent } from './components/period-types/add-periodtypes/add-periodtypes.component';
import { NationalityComponent } from './components/nationality/nationality.component';
import { AddNatioalityComponent } from './components/nationality/add-natioality/add-natioality.component';
import { PriceCategoryComponent } from './components/price-category/price-category.component';
import { AddPricecategoryComponent } from './components/price-category/add-pricecategory/add-pricecategory.component';
import { WorkWeekComponent } from './components/work-week/work-week.component';
import { AddWorkweekComponent } from './components/work-week/add-workweek/add-workweek.component';


@NgModule({
  declarations: [
    SettingComponent,
    RoomTypesComponent,
    TranslationTypesComponent,
    AddRoomtypesComponent,
    VisitTypesComponent,
    AddVisittypesComponent,
    SsnTypesComponent,
    AddSsntypesComponent,
    PeriodTypesComponent,
    AddPeriodtypesComponent,
    NationalityComponent,
    AddNatioalityComponent,
    PriceCategoryComponent,
    AddPricecategoryComponent,
    WorkWeekComponent,
    AddWorkweekComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ThemeGeneralModule,
    SystemModule
  ]
})
export class SettingModule { }
