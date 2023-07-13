import { Component, Inject, OnInit } from '@angular/core';
import { DoctorDegreeService } from '../../../services/doctor-degree.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../@theme/services/lookup.service';

@Component({
  selector: 'ngx-add-degree',
  templateUrl: './add-degree.component.html',
  styleUrls: ['./add-degree.component.scss']
})
export class AddDegreeComponent implements OnInit {
form: FormGroup;
loading=false
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _degreeservice:DoctorDegreeService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddDegreeComponent>,
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
    this._degreeservice.getDegreeById(paylod).subscribe(
      (res:any)=>{
        this.roomTypes = res;
        this.patchForm();
      }
    )
  }
  patchForm(){
    this.form.patchValue({
      // codeNumber:this.roomTypes.codeNumber?this.roomTypes.codeNumber:null,
      degreeName:this.roomTypes.doctorsDegreesTranslations.length > 0?this.roomTypes.doctorsDegreesTranslations[0].degreeName:null,

  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({

      // codeNumber: [null],
      degreeName:[null,Validators.required],

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
        this._degreeservice.createDegree(this.sendData).subscribe(
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
        this._degreeservice.editDegree(this.sendData).subscribe(
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
      doctorsDegreesTranslations:[{
        id:this.id ? this.roomTypes.doctorsDegreesTranslations[0].id:0,
        DegreeName:data.degreeName,
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
        if (key == "doctorsDegreesTranslations") {
          for (let i = 0; i < formVal['doctorsDegreesTranslations'].length; i++) {
            body.append('doctorsDegreesTranslations['+(i)+'][id]', formVal.doctorsDegreesTranslations[i].id );
            body.append('doctorsDegreesTranslations['+(i)+'][DegreeName]', formVal.doctorsDegreesTranslations[i].DegreeName);
            body.append('doctorsDegreesTranslations['+(i)+'][LangCode]', formVal.doctorsDegreesTranslations[i].LangCode);
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
