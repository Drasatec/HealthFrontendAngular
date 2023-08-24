import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent{
  form:FormGroup
  // constructor(private authService:AuthService,private snackBar: MatSnackBar,
  //   private router:Router,private _FormBuilder:FormBuilder
  //   ){}
    // ngOnInit(): void {
    //   console.log("lo")
    //   this.createForm()
      
    // }
  //   createForm(): void {
  //     this.form = this._FormBuilder.group({
  //       UserName: [null,Validators.required],
  //       Password:[null,Validators.required],
  //     });
  //   }
  //   get formControls() {
  //     return this.form.controls;
  //   }
  // save(){
  //   this.form.markAllAsTouched();
  //   if(this.form.valid){
  //     this.authService.login(this.form.value).subscribe(
  //       (res)=>{
  //         if(res.success){
  //           this.snackBar.open("تم الدخول بنجاح ", "success", {
  //             duration: 5000,
  //             panelClass: 'success'
  //           });
  //           this.authService.saveLoginToken(res)
  //           console.log(this.authService.isAuthenticated())
  //           // const redirectUrl = this.authService.getRedirectUrl();
  //           // console.log(redirectUrl)
            
  //             // Navigate to the default page after login
  //             this.router.navigate(['/dashboard']);
            
  //         }else {
  //           this.snackBar.open("الايميل او الباسورد خاطئة", "error", {
  //             duration: 5000,
  //             panelClass: 'error'
  //           });
  //         }

  //       },(error)=>{
  //         this.snackBar.open("الايميل او الباسورد خاطيء", "error", {
  //           duration: 5000,
  //           panelClass: 'error'
  //         });
  //       }
  //     )
  //   }
  // }
}
