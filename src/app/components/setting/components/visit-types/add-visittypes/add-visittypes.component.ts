import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../@theme/services/lookup.service';
import { TypesService } from '../../../services/types.service';
import { VisitTypesService } from '../../../services/visit-types.service';

@Component({
  selector: 'ngx-add-visittypes',
  templateUrl: './add-visittypes.component.html',
  styleUrls: ['./add-visittypes.component.scss']
})
export class AddVisittypesComponent implements OnInit {
  form: FormGroup;
  loading=false
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _roomtypeService:VisitTypesService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddVisittypesComponent>,
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
      this.getVisitTypeById(this.id);
    }
  }
  visitTypes
  getVisitTypeById(id){
    let paylod={
      lang:'ar'
    }
    this._roomtypeService.getvisitTypesById(id,paylod).subscribe(
      (res:any)=>{
        this.visitTypes = res;
        this.patchForm();
      }
    )
  }
  patchForm(){
    this.form.patchValue({
      codeNumber:this.visitTypes.codeNumber?this.visitTypes.codeNumber:null,
      name:this.visitTypes.typesVisitTranslations.length > 0?this.visitTypes.typesVisitTranslations[0].name:null,

  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      codeNumber: [null],
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
        this._roomtypeService.createvisitTypes(this.sendData).subscribe(
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
        this._roomtypeService.editvisitTypes(this.sendData).subscribe(
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
      TypesVisitTranslations:[{
        id:this.id ? this.visitTypes.typesVisitTranslations[0].id:0,
        Name:data.name,
        Description:data.description,
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
        if (key == "TypesVisitTranslations") {
          for (let i = 0; i < formVal['TypesVisitTranslations'].length; i++) {
            body.append('TypesVisitTranslations['+(i)+'][id]', formVal.TypesVisitTranslations[i].id );
            body.append('TypesVisitTranslations['+(i)+'][Name]', formVal.TypesVisitTranslations[i].Name);
            body.append('TypesVisitTranslations['+(i)+'][Address]', formVal.TypesVisitTranslations[i].Address);
            body.append('TypesVisitTranslations['+(i)+'][LangCode]', formVal.TypesVisitTranslations[i].LangCode);
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
