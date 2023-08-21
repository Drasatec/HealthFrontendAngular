import { Component, Inject, OnInit } from '@angular/core';
import { GenderService } from '../../../services/gender.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../@theme/services/lookup.service';
import { AddMaritalstatusComponent } from '../../marital-status/add-maritalstatus/add-maritalstatus.component';

@Component({
  selector: 'ngx-add-gender',
  templateUrl: './add-gender.component.html',
  styleUrls: ['./add-gender.component.scss']
})
export class AddGenderComponent implements OnInit {
  form: FormGroup;
  loading=false
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _nationalservice:GenderService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddGenderComponent>,
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
      lang:'ar',
      id:id
    }
    this._nationalservice.getHumanGenderById(paylod).subscribe(
      (res:any)=>{
        this.nationals = res;
        this.patchForm();
      }
    )
  }
  patchForm(){
    this.form.patchValue({
      // symbol:this.nationals.symbol?this.nationals.symbol:null,
      name:this.nationals.gendersTranslations.length > 0?this.nationals.gendersTranslations[0].name:null,

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
        this._nationalservice.createHumanGender(this.sendData).subscribe(
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
        this._nationalservice.editHumanGender(this.sendData).subscribe(
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
      gendersTranslations:[{
        id:this.id ? this.nationals.gendersTranslations[0].id:0,
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
        if (key == "gendersTranslations") {
          for (let i = 0; i < formVal['gendersTranslations'].length; i++) {
            body.append('gendersTranslations['+(i)+'][id]', formVal.gendersTranslations[i].id );
            body.append('gendersTranslations['+(i)+'][Name]', formVal.gendersTranslations[i].Name);
            body.append('gendersTranslations['+(i)+'][Address]', formVal.gendersTranslations[i].Address);
            body.append('gendersTranslations['+(i)+'][LangCode]', formVal.gendersTranslations[i].LangCode);
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
