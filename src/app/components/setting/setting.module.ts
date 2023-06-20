import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { ThemeGeneralModule } from '../themegeneral.module';
import { RoomTypesComponent } from './components/room-types/room-types.component';
import { TranslationTypesComponent } from './components/translation-types/translation-types.component';
import { SystemModule } from '../system/system.module';
import { AddRoomtypesComponent } from './components/room-types/add-roomtypes/add-roomtypes.component';


@NgModule({
  declarations: [
    SettingComponent,
    RoomTypesComponent,
    TranslationTypesComponent,
    AddRoomtypesComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ThemeGeneralModule,
    SystemModule
  ]
})
export class SettingModule { }
