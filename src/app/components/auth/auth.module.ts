import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { ThemeGeneralModule } from '../themegeneral.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAuthJWTToken, NbAuthModule, NbOAuth2AuthStrategy, NbPasswordAuthStrategy } from '@nebular/auth';
import { environment } from '../../../environments/environment.prod';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ThemeGeneralModule,
    ReactiveFormsModule,
    FormsModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: `${environment.apiUrl}`,

          login: {
            endpoint:'AdminAuth/login',

            redirect: {
              success: '/dashboard',
              failure: null, // stay on the same page
            },
          },
          
          token: {
            class: NbAuthJWTToken,
           
            key: 'token', // this parameter tells where to look for the token
          }
        }),
        
      ],
      forms: {
        logout: {
          redirectDelay: 0,
        },
      },
    }), 
  ]
})
export class AuthModule { }
