import { Component, Inject, OnInit } from '@angular/core';
import { PeriodtypesService } from '../../../services/periodtypes.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../@theme/services/lookup.service';
import { startTimeBeforeEndTimeValidator } from '../../../../../@theme/validation/time.validator';

@Component({
  selector: 'ngx-add-periodtypes',
  templateUrl: './add-periodtypes.component.html',
  styleUrls: ['./add-periodtypes.component.scss']
})
export class AddPeriodtypesComponent implements OnInit {
  form: FormGroup;
  loading=false
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _periodService:PeriodtypesService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddPeriodtypesComponent>,
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
      this.getWorkPeriodById(this.id);
    }
  }
  workPeriods
  getWorkPeriodById(id){
    let paylod={
      lang:'ar'
    }
    this._periodService.getWorkingPeriodsById(id,paylod).subscribe(
      (res:any)=>{
        this.workPeriods = res;
        this.patchForm();
      }
    )
  }
  patchForm(){
    this.form.patchValue({
      codeNumber:this.workPeriods.codeNumber?this.workPeriods.codeNumber:null,
      name:this.workPeriods.workingPeriodTranslations.length > 0?this.workPeriods.workingPeriodTranslations[0].name:null,
      startTime:this.workPeriods.startTime?this.workPeriods.startTime:null,
      endTime:this.workPeriods.endTime?this.workPeriods.endTime:null,
  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({

      codeNumber: [null],
      name:[null,Validators.required],
      startTime:[null,Validators.required],
      endTime:[null,Validators.required],
    }, { validator: startTimeBeforeEndTimeValidator() });
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
        this._periodService.createWorkingPeriods(this.sendData).subscribe(
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
        this._periodService.editWorkingPeriods(this.sendData).subscribe(
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
      WorkingPeriodTranslations:[{
        id:this.id ? this.workPeriods.workingPeriodTranslations[0].id:0,
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
        if (key == "WorkingPeriodTranslations") {
          for (let i = 0; i < formVal['WorkingPeriodTranslations'].length; i++) {
            body.append('WorkingPeriodTranslations['+(i)+'][id]', formVal.WorkingPeriodTranslations[i].id );
            body.append('WorkingPeriodTranslations['+(i)+'][Name]', formVal.WorkingPeriodTranslations[i].Name);
            body.append('WorkingPeriodTranslations['+(i)+'][LangCode]', formVal.WorkingPeriodTranslations[i].LangCode);
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
