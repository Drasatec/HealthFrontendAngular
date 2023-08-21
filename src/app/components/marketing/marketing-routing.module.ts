import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketingComponent } from './marketing.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PromotionComponent } from './components/promotion/promotion.component';

const routes: Routes = [
  { path: '', component: MarketingComponent,children:[
    {path:'contactUs',component:ContactUsComponent},
    {path:'promotions',component:PromotionComponent},
    {path:'',redirectTo:'contactUs',pathMatch:'full'},

  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
