import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';

const routes: Routes = [
  { path: '', component: SystemComponent,children:[
    { path: 'buildings', loadChildren: () => import('./components/buildings/buildings.module').then(m => m.BuildingsModule) },
    { path: 'hospitals', loadChildren: () => import('./components/hospitals/hospitals.module').then(m => m.HospitalsModule) },
    { path: 'doctors', loadChildren: () => import('./components/doctors/doctors.module').then(m => m.DoctorsModule) },
    { path: 'floors', loadChildren: () => import('./components/floors/floors.module').then(m => m.FloorsModule) },
    { path: 'rooms', loadChildren: () => import('./components/rooms/rooms.module').then(m => m.RoomsModule) },
    { path: 'specialities', loadChildren: () => import('./components/specialities/specialities.module').then(m => m.SpecialitiesModule) },


    {path:'',redirectTo:'hospitals',pathMatch:'full'}
  ] },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
