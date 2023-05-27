import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';

const routes: Routes = [
  { path: '', component: SystemComponent,children:[
    { path: 'buildings', loadChildren: () => import('./components/buildings/buildings.module').then(m => m.BuildingsModule) },
    { path: 'hospitals', loadChildren: () => import('./components/hospitals/hospitals.module').then(m => m.HospitalsModule) },
    {path:'',redirectTo:'hospitals',pathMatch:'full'}
  ] },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
