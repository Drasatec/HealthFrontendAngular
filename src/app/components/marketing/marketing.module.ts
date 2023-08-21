import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketingRoutingModule } from './marketing-routing.module';
import { MarketingComponent } from './marketing.component';
import { ThemeGeneralModule } from '../themegeneral.module';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { SystemModule } from '../system/system.module';
import { ViewContactComponent } from './components/contact-us/view-contact/view-contact.component';
import { AddPromotionComponent } from './components/promotion/add-promotion/add-promotion.component';


@NgModule({
  declarations: [
    MarketingComponent,
    ContactUsComponent,
    PromotionComponent,
    ViewContactComponent,
    AddPromotionComponent
  ],
  imports: [
    CommonModule,
    MarketingRoutingModule,
    ThemeGeneralModule,
    SystemModule,

  ]
})
export class MarketingModule { }
