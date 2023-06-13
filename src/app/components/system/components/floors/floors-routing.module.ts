import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorsComponent } from './floors.component';
import { AddFloorComponent } from './components/add-floor/add-floor.component';
import { AllFloorsComponent } from './components/all-floors/all-floors.component';
import { ViewFloorComponent } from './components/view-floor/view-floor.component';

const routes: Routes = [
  { path: '', component: FloorsComponent,children:[
    {path:'add-floor',component : AddFloorComponent},
    {path:'all-floor',component : AllFloorsComponent},
    {path:'view-floor/:id',component : ViewFloorComponent},
    {path: '',redirectTo: "all-floor",pathMatch:'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorsRoutingModule { }
