import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorssRoutingModule } from './doctorss-routing.module';
import { DoctorssComponent } from './doctorss.component';
import { ThemeGeneralModule } from '../../../themegeneral.module';
import { AllDoctorssComponent } from './components/all-doctorss/all-doctorss.component';
import { SystemModule } from '../../system.module';
import { AddDoctorssComponent } from './components/add-doctorss/add-doctorss.component';
import { InfoAccountComponent } from './components/add-doctorss/partials/info-account/info-account.component';
import { InfoBasicComponent } from './components/add-doctorss/partials/info-basic/info-basic.component';
import { UploadFilesComponent } from './components/add-doctorss/partials/upload-files/upload-files.component';
import { InfoJobsComponent } from './components/add-doctorss/partials/info-jobs/info-jobs.component';
import { AddDoctorTranslateComponent } from './components/add-doctor-translate/add-doctor-translate.component';


@NgModule({
  declarations: [
    DoctorssComponent,
    AllDoctorssComponent,
    AddDoctorssComponent,
    InfoAccountComponent,
    InfoBasicComponent,
    UploadFilesComponent,
    InfoJobsComponent,
    AddDoctorTranslateComponent
  ],
  imports: [
    CommonModule,
    DoctorssRoutingModule,
    ThemeGeneralModule,
    SystemModule
  ]
})
export class DoctorssModule { }
