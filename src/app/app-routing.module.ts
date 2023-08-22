import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { ECommerceComponent } from './pages/e-commerce/e-commerce.component';
import { NotFoundComponent } from './pages/miscellaneous/not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './components/auth/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: ECommerceComponent,
        canActivate:[AuthGuard],

      },
      { path: 'system',
       loadChildren: () => import('./components/system/system.module').then(m => m.SystemModule),
       canActivate:[AuthGuard],
      },
  
      { 
        path: 'booking', 
        loadChildren: () => import('./components/Reception/booking/booking.module').then(m => m.BookingModule),
        canActivate:[AuthGuard],
       },
      { path: 'system/settings',
       loadChildren: () => import('./components/setting/setting.module').then(m => m.SettingModule),
       canActivate:[AuthGuard],
      },
      { path: 'marketing',
       loadChildren: () => import('./components/marketing/marketing.module').then(m => m.MarketingModule),
       canActivate:[AuthGuard],
      },
     
    ],
  },
  {
    path:'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', component:NotFoundComponent },
];

// const config: ExtraOptions = {
//   useHash: false,
// };

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
  }),],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
