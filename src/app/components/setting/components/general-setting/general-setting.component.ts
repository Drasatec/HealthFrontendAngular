import { Component, OnInit } from '@angular/core';
import { GeneralSettingService } from '../../services/general-setting.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ngx-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss']
})
export class GeneralSettingComponent implements OnInit {
  code:string=''
  confirmationMethod=[]
  loading:boolean=true
  constructor(private generalservice:GeneralSettingService,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {

    this.generalservice.getConfirmationCode().subscribe(
      (res)=>{
        this.loading=false
        this.confirmationMethod=res
      }
    )
  }
  chooseValue:string=''
  choseMethod(e:any){
    this.chooseValue=e.value
  }
  save(){
    
    this.generalservice.changeConfirmationCode(this.chooseValue).subscribe(
      (res)=>{
        this.snackBar.open("تم التعديل بنجاح ", "ُsuccess", {
          duration: 3000,
          panelClass: 'success'
        });
      }
    )
  }
}
