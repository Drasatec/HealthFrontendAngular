import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingsComponent } from './buildings.component';
import { AddBuildingComponent } from './components/add-building/add-building.component';
import { AllBuildingsComponent } from './components/all-buildings/all-buildings.component';

const routes: Routes = [
  { path: '', component: BuildingsComponent,
    children:[
      {path:'add-building',component : AddBuildingComponent},
      {path:'all-building',component : AllBuildingsComponent},
      {path:'',redirectTo:'all-building',pathMatch:'full'}
    ]
  },

  // {path:'view-building/:id',component : },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingsRoutingModule { }