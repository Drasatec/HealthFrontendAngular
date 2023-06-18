import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialitiesComponent } from './specialities.component';
import { AddSpecialComponent } from './components/add-special/add-special.component';
import { AllSpecialsComponent } from './components/all-specials/all-specials.component';
import { ViewSpecialComponent } from './components/view-special/view-special.component';

const routes: Routes = [
  { path: '', component: SpecialitiesComponent,children:[
    {path:'add-special',component : AddSpecialComponent},
    {path:'all-specials',component : AllSpecialsComponent},
    {path:'view-special/:id',component : ViewSpecialComponent},
    {path: '',redirectTo: "all-specials",pathMatch:'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialitiesRoutingModule { }
