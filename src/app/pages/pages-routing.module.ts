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
    { path: 'hospitals',
      loadChildren: () => import('../components/hospitals/hospitals.module').then(m => m.HospitalsModule)
    },
    { path: 'buildings',
      loadChildren: () => import('../components/buildings/buildings.module').then(m => m.BuildingsModule)
    },


    {
      path: '',
      redirectTo: 'hospitals',
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
