import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';
import { RoomTypesComponent } from './components/room-types/room-types.component';
import { VisitTypesComponent } from './components/visit-types/visit-types.component';
import { SsnTypesComponent } from './components/ssn-types/ssn-types.component';
import { PeriodTypesComponent } from './components/period-types/period-types.component';
import { NationalityComponent } from './components/nationality/nationality.component';
import { PriceCategoryComponent } from './components/price-category/price-category.component';
import { WorkWeekComponent } from './components/work-week/work-week.component';
import { DoctorDegreeComponent } from './components/doctor-degree/doctor-degree.component';
import { DoctorStatusComponent } from './components/doctor-status/doctor-status.component';
import { MaritalStatusComponent } from './components/marital-status/marital-status.component';
import { ReligionsComponent } from './components/religions/religions.component';
import { GenderComponent } from './components/gender/gender.component';
import { CurrancyComponent } from './components/currancy/currancy.component';
import { BookingStatusComponent } from './components/booking-status/booking-status.component';
import { GeneralSettingComponent } from './components/general-setting/general-setting.component';
import { LanguageComponent } from './components/language/language.component';

const routes: Routes = [
  { path: '', component: SettingComponent,children:[
    {path:'room-types',component:RoomTypesComponent},
    {path:'visit-types',component:VisitTypesComponent},
    {path:'ssn-types',component:SsnTypesComponent},
    {path:'working-period',component:PeriodTypesComponent},
    {path:'nationality',component:NationalityComponent},
    {path:'price-category',component:PriceCategoryComponent},
    {path:'work-week',component:WorkWeekComponent},
    {path:'doctor-degree',component:DoctorDegreeComponent},
    {path:'doctor-status',component:DoctorStatusComponent},
    {path:'religions',component:ReligionsComponent},
    {path:'maritalStatus',component:MaritalStatusComponent},
    {path:'bookingStatus',component:BookingStatusComponent},
    {path:'currancy',component:CurrancyComponent},
    {path:'gender',component:GenderComponent},
    {path:'general-setting',component:GeneralSettingComponent},
    {path:'languages',component:LanguageComponent},



    {path:'',redirectTo:'general-setting',pathMatch:'full'},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
