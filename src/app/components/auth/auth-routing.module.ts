import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { NbAuthComponent } from '@nebular/auth';

const routes: Routes = [
  { path: '', component: NbAuthComponent ,children:[
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
