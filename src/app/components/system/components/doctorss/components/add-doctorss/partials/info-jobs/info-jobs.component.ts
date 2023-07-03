import { Component, EventEmitter, Inject, Input, OnInit, Output, AfterViewInit, AfterContentChecked, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../../../environments/environment';
import { HelperService } from '../../../../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../../../../@theme/services/lookup.service';
import { DoctorsService } from '../../../../services/doctors.service';
import { AddDoctorTranslateComponent } from '../../../add-doctor-translate/add-doctor-translate.component';
import { AddDoctorssComponent } from '../../add-doctorss.component';

@Component({
  selector: 'ngx-info-jobs',
  templateUrl: './info-jobs.component.html',
  styleUrls: ['./info-jobs.component.scss']
})
export class InfoJobsComponent implements OnInit {
  @Input() doctorInfo;
  days=[{name:'السبت',id:1},{name:'الاحد',id:2},{name:'الاتنين',id:3},{name:'الثلاثاء',id:4},{name:'الاربعاء',id:5}
  ,{name:'الخميس',id:6},{name:'الجمعة',id:7}];
  form: FormGroup;
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _doctorService:DoctorsService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddDoctorssComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  id:number;
  doctor:any;

  ngOnInit(): void {
    this.doctorInfo? console.log(this.doctorInfo):console.log("no")

    this.getClinics()
    this.getSpecialize()
    this.getWorkingPeriods()

    this.createForm();
    if(this.data?.id){
      // this.getVisitPrice(this.data?.id)
    }
  }
  clinics;
  getClinics(){
    let payload={
      pageSize:30
    }
    this._lookpservice.getAllClinicsNames(payload).subscribe(
      (res)=>{
        this.clinics = res
      }
    )
  }
  specials;
getSpecialize(){
  let payload={
    pageSize:30
  }
  this._lookpservice.getAllSpecialNames(payload).subscribe(
    (res)=>{
      this.specials = res
    }
  )
}
workingPeriods;
getWorkingPeriods(){
  let payload={
    pageSize:30
  }
  this._lookpservice.getAllWorkingPeriodNames(payload).subscribe(
    (res)=>{
      this.workingPeriods = res
    }
  )
}
doctorVisitPrice
getVisitPrice(id:number){
  this._doctorService.getDoctorVisit(id).subscribe(
    (res)=>{
      this.doctorVisitPrice=res
    }
  )
}
  patchForm(){
    this.form.patchValue({

      codeNumber:this.doctor.codeNumber?this.doctor.codeNumber:null,
      FullName:this.doctor.doctorTranslations.length > 0?this.doctor.doctorTranslations[0].fullName:null,
      Gender:this.doctor.gender?this.doctor.gender:null,
      PhoneNumber:this.doctor.phoneNumber?this.doctor.phoneNumber:null,
      PhoneNumberAppearance:this.doctor.phoneNumberAppearance?this.doctor.phoneNumberAppearance:null,
      IsAppearanceOnSite:this.doctor.isAppearanceOnSite?this.doctor.isAppearanceOnSite:null,
      workingHours:this.doctor.codeNumber?this.doctor.codeNumber:null,
      VisitPriceAppearance:this.doctor.visitPriceAppearance?this.doctor.visitPriceAppearance:null,
      About:this.doctor.doctorTranslations.length > 0?this.doctor.doctorTranslations[0].about:null,
      Headline:this.doctor.doctorTranslations.length > 0?this.doctor.doctorTranslations[0].headline:null,
      NationalityId:this.doctor.nationalityId?this.doctor.nationalityId:null,

      DocStatus:this.doctor.docStatus?this.doctor.docStatus:null,
      DoctorsDegreeId:this.doctor.doctorsDegreeId?this.doctor.doctorsDegreeId:null,

  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      clinicId:[null],
      specialId:[null],
      onDay:[null],
      workingPeriodId:[null],
    });
  }
  get formControls() {
    return this.form.controls;
  }

  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){
        this._doctorService.createDoctor(this.sendData).subscribe(
          (res)=>{
            this.snackBar.open("تم الاضافة بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
          },
          (err) => {
            this.snackBar.open("من فضلك حاول مرة اخري", "ُError", {
              duration: 3000,
              panelClass: 'error'
            });

          }
        )
      }else{
        this._doctorService.editDoctor(this.id,this.sendData).subscribe(
          (res)=>{
            this.snackBar.open("تم التعديل بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
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

  sendData;
  prepareDataBeforeSend(data){
    console.log(data)
    let paylod={
      ...data,
      DoctorTranslations:[{
        id:this.id ? this.doctor.doctorTranslations[0].id:0,
        FullName:data.FullName,
        About:data.About,
        Headline:data.Headline,
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
        if (key == "DoctorTranslations") {
          for (let i = 0; i < formVal['DoctorTranslations'].length; i++) {
            body.append('DoctorTranslations['+(i)+'][id]', formVal.DoctorTranslations[i].id );
            body.append('DoctorTranslations['+(i)+'][FullName]', formVal.DoctorTranslations[i].FullName);
            body.append('DoctorTranslations['+(i)+'][About]', formVal.DoctorTranslations[i].About);
            body.append('DoctorTranslations['+(i)+'][LangCode]', formVal.DoctorTranslations[i].LangCode);
            body.append('DoctorTranslations['+(i)+'][Headline]', formVal.DoctorTranslations[i].Headline);
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

