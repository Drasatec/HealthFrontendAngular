import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  selector: 'ngx-info-basic',
  templateUrl: './info-basic.component.html',
  styleUrls: ['./info-basic.component.scss']
})
export class InfoBasicComponent implements OnInit {
  gander=[{name:'انثي',id:1},{name:'ذكر',id:2}];
  answer=[{name:'نعم',value:true},{name:'لا',value:false}];
  docStatus=[{id:1,name: 'مقيم'},{id:2,name: "متوقف عن العمل"},{id:3,name: "اجازة"},{id: 4,name: "مسافر"}]
  DoctorsDegree=[{name:'امتياز',id:1},{name:'استشاري',id:2},{name:'بروفيسور',id:3}]
  form: FormGroup;
  imgUrl=`${environment.imgUrl}`;

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
    // this.route.params.subscribe(
    //   (param)=>{
    // console.log(param)

    //     this.id =param.id;
    //   }
    // )
    this.id=this.data? this.data.id :null
    this.getNational()
    this.createForm();
    if(this.id){
      this.getDoctorById(this.id);
    }
  }
  getDoctorById(id){
    let paylod={
      lang:'ar'
    }
    this._doctorService.getDoctorById(id,paylod).subscribe(
      (res:any)=>{
        this.doctor = res;
        this.patchForm();
      }
    )
  }
  phoneNumbers;
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
      codeNumber:[null],
      Gender:[null],
      DocStatus:[null],
      workingHours:[null],
      PhoneNumber:[null],
      IsAppearanceOnSite:[null],
      PhoneNumberAppearance:[null],
      VisitPriceAppearance:[null],
      DoctorsDegreeId:[null],
      NationalityId:[null],
      FullName:[null],
      Headline:[null],
      About:[null],
    });
  }
  get formControls() {
    return this.form.controls;
  }
  translateData;
  openTranslateDialog(){
    const dialogRef = this.dialog.open(AddDoctorTranslateComponent,{
      width: "1200px",
      disableClose: true,
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
      }
    });
  }
  newBuildId;

  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){
        this._doctorService.createDoctor(this.sendData).subscribe(
          (res)=>{
            this.newBuildId = res.id
            this.snackBar.open("تم اضافة الطبيب بنجاح ", "ُsuccess", {
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
        this._doctorService.editDoctor(this.id,this.sendData).subscribe(
          (res)=>{
            this.snackBar.open("تم تعديل الطبيب بنجاح ", "ُsuccess", {
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
    this.dialogRef.close(this.newBuildId);
  }
  closeEditDialog() {
    this.dialogRef.close({isAdd:true});
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
      file:this.files[0],
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

  /** attachment */
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  national;
  getNational(){
    this._lookpservice.getAllNationalityNames().subscribe(
      (res)=>{
        this.national=res
      }
    )
  }

}

