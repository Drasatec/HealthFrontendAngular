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
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/components/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { ECommerceComponent } from './pages/e-commerce/e-commerce.component';
import { AuthGuard } from './components/auth/guard/auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate:[AuthGuard],
    children: [
      // {path:'',redirectTo:'/dashboard',pathMatch:'full'},
      {
        path: 'dashboard',
        component: ECommerceComponent,
         canActivate:[AuthGuard],

      },
      { path: 'system', loadChildren: () => import('./components/system/system.module').then(m => m.SystemModule) },
  
      { path: 'booking', loadChildren: () => import('./components/Reception/booking/booking.module').then(m => m.BookingModule) },
      { path: 'system/settings', loadChildren: () => import('./components/setting/setting.module').then(m => m.SettingModule) },
      { path: 'marketing', loadChildren: () => import('./components/marketing/marketing.module').then(m => m.MarketingModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
    ]
  },
 
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module')
      .then(m => m.AuthModule),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];

// const config: ExtraOptions = {
//   useHash: false,
// };

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
