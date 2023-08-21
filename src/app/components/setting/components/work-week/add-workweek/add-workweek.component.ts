import { Component, Inject, OnInit } from '@angular/core';
import { WorkweekService } from '../../../services/workweek.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../@theme/services/lookup.service';

@Component({
  selector: 'ngx-add-workweek',
  templateUrl: './add-workweek.component.html',
  styleUrls: ['./add-workweek.component.scss']
})
export class AddWorkweekComponent implements OnInit {
  form: FormGroup;
  loading=false
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _nationalservice:WorkweekService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddWorkweekComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  id:number;
  building:any;
  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (param)=>{
    // console.log(param)

    //     this.id =param.id;
    //   }
    // )
    this.id=this.data? this.data.id :null
    this.createForm();
    if(this.id){
      this.getNationalById(this.id);
    }
  }
  nationals
  getNationalById(id){
    let paylod={
      lang:'ar'
    }
    this._nationalservice.getWorkWeekById(id,paylod).subscribe(
      (res:any)=>{
        this.nationals = res;
        this.patchForm();
      }
    )
  }
  patchForm(){
    this.form.patchValue({
      // symbol:this.nationals.symbol?this.nationals.symbol:null,
      name:this.nationals.weekdaysTranslations.length > 0?this.nationals.weekdaysTranslations[0].name:null,

  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      // Symbol: [null],
      name:[null,Validators.required],
    });
  }
  get formControls() {
    return this.form.controls;
  }
  translateData;
  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){
        this._nationalservice.addWorkWeek(this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.snackBar.open("تم الاضافة  بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.closeDialog()
          },
          (err) => {
            this.loading=false

            this.snackBar.open("من فضلك حاول مرة اخري", "ُError", {
              duration: 3000,
              panelClass: 'error'
            });

          }
        )
      }else{
        this._nationalservice.editWorkWeek(this.sendData).subscribe(
          (res)=>{
            this.loading=false

            this.snackBar.open("تم التعديل  بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.closeEditDialog()
          },
          (err) => {
            this.loading=false

            this.snackBar.open("من فضلك حاول مرة اخري", "ُError", {
              duration: 3000,
              panelClass: 'error'
            });

          }
        )
      }

    }
  }

  closeDialog() {
    this.dialogRef.close({isAdd:true});
  }
  closeEditDialog() {
    this.dialogRef.close({isAdd:true});
  }
  sendData;
  prepareDataBeforeSend(data){
    console.log(data)
    let paylod={
      id:this.id?this.id:null,
      ...data,
      weekdaysTranslations:[{
        id:this.id ? this.nationals.weekdaysTranslations[0].id:0,
        Name:data.name,
        // Description:data.description,
        LangCode:'ar',
      }],
    }
    this.sendData=this.formData(paylod)
  }
  formData(obj) {
    console.log(obj)

    let body = new FormData();
    let bodyObj = {}
    const formVal = obj;
    Object.keys(formVal).forEach((key) => {
      if (formVal[key]) {
        bodyObj[key] = formVal[key]
        if (key == "weekdaysTranslations") {
          for (let i = 0; i < formVal['weekdaysTranslations'].length; i++) {
            body.append('weekdaysTranslations['+(i)+'][id]', formVal.weekdaysTranslations[i].id );
            body.append('weekdaysTranslations['+(i)+'][Name]', formVal.weekdaysTranslations[i].Name);
            body.append('weekdaysTranslations['+(i)+'][Address]', formVal.weekdaysTranslations[i].Address);
            body.append('weekdaysTranslations['+(i)+'][LangCode]', formVal.weekdaysTranslations[i].LangCode);
          }
        }
        else if (key == "PhoneNumbers") {
          for (let i = 0; i < formVal['PhoneNumbers'].length; i++) {
            body.append('PhoneNumbers['+(i)+'][id]', formVal.PhoneNumbers[i].id);
            body.append('PhoneNumbers['+(i)+'][TelephoneNumber]', formVal.PhoneNumbers[i].TelephoneNumber);
          }
        }
        else {
          body.append(key, formVal[key]);
        }

      }
    });
    return body;
  }
  cancel(){
    this.form.reset()
  }

}
