import { Component, Inject, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { LookupService } from '../../../../../../@theme/services/lookup.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { HelperService } from '../../../../../../@theme/services/helper.service';
import * as moment from "moment";

@Component({
  selector: 'ngx-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  form: FormGroup;
  imgUrl=`${environment.imgUrl}`;
  loading=false
  readonly DT_FORMAT = "DD-MM-YYYY";
  religions=[{name:'مسلم',id:1},{name:'مسيحي',id:1},{name:'اخري',id:1}]
  MaritalStatus=[{name:'متزوج',id:1},{name:'اعذب',id:1},{name:'ارمل',id:1},{name:'اخري',id:1}]

  ngModelDate = new Date();
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    private _patientservice:PatientService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
  }
  id:number;
  patient:any;
  ngOnInit(): void {
    this.getGanders()
    this.getSsn()
    this.getNational()
    this.createForm();
    this.id=this.data? this.data.id :null

    if(this.id){
      this.getPatientById(this.id);
    }
  }
  gander
  getGanders(){
    this._lookpservice.getAllGender().subscribe(
      (res)=>{
        this.gander=res
      }
    )
  }
  ssn
  getSsn(){
    this._lookpservice.getAllSsn().subscribe(
      (res)=>{
        this.ssn=res
      }
    )
  }
  national;
  getNational(){
    this._lookpservice.getAllNationalityNames().subscribe(
      (res)=>{
        this.national=res
      }
    )
  }
  getPatientById(id){
    let paylod={
      lang:'ar'
    }
    this._patientservice.getPatientById(id,paylod).subscribe(
      (res:any)=>{
        this.patient = res;
        this.patchForm();

      }
    )
  }
  phoneNumbers;
  patchForm(){
    this.form.patchValue({
      MedicalFileNumber:this.patient.medicalFileNumber,
      FullName:this.patient.patientTranslations.length >0 ? this.patient.patientTranslations[0].fullName : null,
      PhoneNumber :this.patient.phoneNumber,
      Address:this.patient.patientTranslations.length >0 ? this.patient.patientTranslations[0].address : null,
      Gender:this.patient.gender,
      BirthDate:this.patient.birthDate,
      MaritalStatus:this.patient.maritalStatus,
      Religion : this.patient.religion,
      NationalityId:this.patient.nationalityId,
      BloodType:this.patient.bloodType,
      Occupation :this.patient.patientTranslations.length >0 ? this.patient.patientTranslations[0].occupation : null,
  })
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      MedicalFileNumber:[null],
      FullName:[null,Validators.required],
      PhoneNumber:[null,Validators.required],
      Address:[null],
      Gender:[null],
      BirthDate:[null],
      MaritalStatus:[null],
      Religion:[null],
      NationalityId:[null],
      BloodType:[null],
      Occupation:[null],
    });
  }
  get formControls() {
    return this.form.controls;
  }
  newpatientId;
  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){
        this._patientservice.createPatient(this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.newpatientId = res.id
            this.snackBar.open("تم اضافة المريض بنجاح ", "ُsuccess", {
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
        this._patientservice.editPatient(this.id,this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.snackBar.open("تم تعديل المريض بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.closeDialog({isAdd:true})
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
  sendData;
  prepareDataBeforeSend(data){
    console.log(data)
    let paylod={
      ...data,
      BirthDate:data.BirthDate ? moment([
        data.BirthDate.year,
        data.BirthDate.month-1,
        data.BirthDate.day,
      ]).format(this.DT_FORMAT): null,
      patientTranslations:[{
        id:this.id?this.patient.patientTranslations[0].id:0,
        FullName:data.FullName ?data.FullName:null,
        Religion:data.Religion ? data.Religion :null,
        Occupation:data.Occupation ? data.Occupation :null,
        Address:data.Address ? data.Address :null,
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
        if (key == "patientTranslations") {
          for (let i = 0; i < formVal['patientTranslations'].length; i++) {
            body.append('patientTranslations['+(i)+'][id]', formVal.patientTranslations[i].id );
            body.append('patientTranslations['+(i)+'][FullName]', formVal.patientTranslations[i].FullName);
            body.append('patientTranslations['+(i)+'][Address]', formVal.patientTranslations[i].Address);
            body.append('patientTranslations['+(i)+'][Occupation]', formVal.patientTranslations[i].Occupation);
            body.append('patientTranslations['+(i)+'][Religion]', formVal.patientTranslations[i].Religion);
            body.append('patientTranslations['+(i)+'][LangCode]', formVal.patientTranslations[i].LangCode);
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
  closeDialog(data?) {
    this.dialogRef.close(data ? data :this.newpatientId);
  }

}
