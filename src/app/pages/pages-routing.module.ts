import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    { path: 'system', loadChildren: () => import('../components/system/system.module').then(m => m.SystemModule) },

    { path: 'booking', loadChildren: () => import('../components/Reception/booking/booking.module').then(m => m.BookingModule) },
    { path: 'system/settings', loadChildren: () => import('../components/setting/setting.module').then(m => m.SettingModule) },

    {
      path: '',
      redirectTo: 'system',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
