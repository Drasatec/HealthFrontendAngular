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
import { DoctorStatusComponent } from './components/doctor-status/doctor-status.component';
import { DoctorDegreeComponent } from './components/doctor-degree/doctor-degree.component';
import { AddDegreeComponent } from './components/doctor-degree/add-degree/add-degree.component';
import { AddStatusComponent } from './components/doctor-status/add-status/add-status.component';
import { ReligionsComponent } from './components/religions/religions.component';
import { MaritalStatusComponent } from './components/marital-status/marital-status.component';
import { AddReligionComponent } from './components/religions/add-religion/add-religion.component';
import { AddMaritalstatusComponent } from './components/marital-status/add-maritalstatus/add-maritalstatus.component';
import { CurrancyComponent } from './components/currancy/currancy.component';
import { AddBookingstatusComponent } from './components/booking-status/add-bookingstatus/add-bookingstatus.component';
import { BookingStatusComponent } from './components/booking-status/booking-status.component';
import { AddCurrancyComponent } from './components/currancy/add-currancy/add-currancy.component';
import { AddGenderComponent } from './components/gender/add-gender/add-gender.component';
import { GenderComponent } from './components/gender/gender.component';
import { GeneralSettingComponent } from './components/general-setting/general-setting.component';
import { MatRadioModule } from '@angular/material/radio';
import { LanguageComponent } from './components/language/language.component';
import { AddLanguageComponent } from './components/language/add-language/add-language.component';


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
    AddWorkweekComponent,
    DoctorStatusComponent,
    DoctorDegreeComponent,
    AddDegreeComponent,
    AddStatusComponent,
    ReligionsComponent,
    MaritalStatusComponent,
    AddReligionComponent,
    AddMaritalstatusComponent,
    GenderComponent,
    BookingStatusComponent,
    AddGenderComponent,
    AddBookingstatusComponent,
    AddCurrancyComponent,
    CurrancyComponent,
    GeneralSettingComponent,
    LanguageComponent,
    AddLanguageComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ThemeGeneralModule,
    SystemModule,
    MatRadioModule
  ]
})
export class SettingModule { }
