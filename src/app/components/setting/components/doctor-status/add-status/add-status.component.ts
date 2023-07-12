import { Component, Inject, OnInit } from '@angular/core';
import { DoctorStatusService } from '../../../services/doctor-status.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../@theme/services/lookup.service';

@Component({
  selector: 'ngx-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.scss']
})
export class AddStatusComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _statusservice:DoctorStatusService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddStatusComponent>,
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
      this.getRoomTypeById(this.id);
    }
  }
  roomTypes
  getRoomTypeById(id){
    let paylod={
      lang:'ar',
      id:id
    }
    this._statusservice.getStatusById('',paylod).subscribe(
      (res:any)=>{
        this.roomTypes = res;
        this.patchForm();
      }
    )
  }
  patchForm(){
    this.form.patchValue({
      // codeNumber:this.roomTypes.codeNumber?this.roomTypes.codeNumber:null,
      statusName:this.roomTypes.employeesStatusTranslations.length > 0?this.roomTypes.employeesStatusTranslations[0].statusName:null,

  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({

      // codeNumber: [null],
      statusName:[null],

    });
  }
  get formControls() {
    return this.form.controls;
  }
  translateData;
  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){
        this._statusservice.createStatus(this.sendData).subscribe(
          (res)=>{
            this.snackBar.open("تم الاضافة  بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.closeDialog()
          },
          (err) => {
            this.snackBar.open("من فضلك حاول مرة اخري", "ُError", {
              duration: 3000,
              panelClass: 'error'
            });

          }
        )
      }else{
        this._statusservice.editStatus(this.sendData).subscribe(
          (res)=>{
            this.snackBar.open("تم التعديل  بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.closeEditDialog()
          },
          (err) => {
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
      employeesStatusTranslations:[{
        id:this.id ? this.roomTypes.employeesStatusTranslations[0].id:0,
        StatusName:data.statusName,
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
        if (key == "employeesStatusTranslations") {
          for (let i = 0; i < formVal['employeesStatusTranslations'].length; i++) {
            body.append('employeesStatusTranslations['+(i)+'][id]', formVal.employeesStatusTranslations[i].id );
            body.append('employeesStatusTranslations['+(i)+'][StatusName]', formVal.employeesStatusTranslations[i].StatusName);
            body.append('employeesStatusTranslations['+(i)+'][LangCode]', formVal.employeesStatusTranslations[i].LangCode);
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
