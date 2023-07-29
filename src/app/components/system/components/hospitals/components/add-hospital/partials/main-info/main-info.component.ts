import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../../../environments/environment';
import { HelperService } from '../../../../../../../../@theme/services/helper.service';
import { HospitalService } from '../../../../services/hospital.service';
import { AddHospitalComponent } from '../../add-hospital.component';

@Component({
  selector: 'ngx-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent implements OnInit {
  form: FormGroup;
  imgUrl=`${environment.imgUrl}`;
  loading=false
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    private _hospitalservice:HospitalService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    public dialogRef: MatDialogRef<AddHospitalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
  }
  id:number;
  hospital:any;
  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (param)=>{
    // console.log(param)

    //     this.id =param.id;
    //   }
    // )
    this.createForm();
    this.id=this.data? this.data.id :null

    if(this.id){
      this.getHospitalById(this.id);
    }
  }
  getHospitalById(id){
    let paylod={
      lang:'ar'
    }
    this._hospitalservice.getHospitalById(id,paylod).subscribe(
      (res:any)=>{
        this.hospital = res;
        this.phoneNumbers=res.phoneNumbers;
        this.patchForm();
        this.phoneNumbers?.forEach(el => {
          this.addPhone(el);
        })
      }
    )
  }
  phoneNumbers;
  patchForm(){
    this.form.patchValue({
      codeNumber:this.hospital.codeNumber?this.hospital.codeNumber:null,
      email:this.hospital.email?this.hospital.email:null,
      whatsAppNumber:this.hospital.whatsAppNumber?this.hospital.whatsAppNumber:null,
      address:this.hospital.hospitalTrasnlations.length > 0?this.hospital.hospitalTrasnlations[0].address:null,
      name:this.hospital.hospitalTrasnlations.length > 0?this.hospital.hospitalTrasnlations[0].name:null,
      description:this.hospital.hospitalTrasnlations.length > 0?this.hospital.hospitalTrasnlations[0].description:null,
  })
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      codeNumber: [null],
      address: [null,Validators.required],
      name:[null,Validators.required],
      description:[null],
      email:[null],
      PhoneNumbers: this._FormBuilder.array([this.createPhoneFormGroup()]),
      whatsAppNumber:[null],
    });
  }
  private createPhoneFormGroup(data?): FormGroup {
    return this._FormBuilder.group({
      'id':new FormControl(data?.id),
      'TelephoneNumber': new FormControl(data?.telephoneNumber,Validators.required),

    })
  }
  get phonenumberArray(): FormArray {
    return this.form.get('PhoneNumbers') as FormArray;
  }
  public addPhone(data?) {

    const emails = this.form.get('PhoneNumbers') as FormArray
    emails.push(this.createPhoneFormGroup(data))
  }

  public removeOrClearPhone(i: number) {
    const phones = this.form.get('PhoneNumbers') as FormArray
    if (phones.length > 1) {
      phones.removeAt(i)
    } else {
      phones.reset()
    }
  }
  get formControls() {
    return this.form.controls;
  }
  translateData;
  // openTranslateDialog(){
  //   const dialogRef = this.dialog.open(AddInfoTranslateComponent,{
  //     width: "1200px",
  //     disableClose: true,
  //   })
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(result)
  //     if(result){
  //     }
  //   });
  // }
  newHospitalId;
  @Output() navigateToAccountTab: EventEmitter<number> = new EventEmitter<number>();

  emitIdAndNavigate(newHospitalId?) {
    this.navigateToAccountTab.emit(newHospitalId);
  }
  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){
        this._hospitalservice.createHospital(this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.newHospitalId = res.id
            this.snackBar.open("تم اضافة المستشفي بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.emitIdAndNavigate(this.newHospitalId )

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
        this._hospitalservice.editHospital(this.id,this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.snackBar.open("تم تعديل المستشفي بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.router.navigate(["/dashboard/system/hospitals/view-hospital",this.id]);
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
    data.PhoneNumbers =
    data?.PhoneNumbers.map((el) => {
      return this._helpservice.deleteNullValues(el);
    });
    console.log(data)
    let paylod={
      ...data,
      HospitalTrasnlations:[{
        id:this.id?this.hospital.hospitalTrasnlations[0].id:0,
        Name:data.name,
        Address:data.address,
        Description:data.description,
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
        if (key == "HospitalTrasnlations") {
          for (let i = 0; i < formVal['HospitalTrasnlations'].length; i++) {
            body.append('HospitalTrasnlations['+(i)+'][id]', formVal.HospitalTrasnlations[i].id );
            body.append('HospitalTrasnlations['+(i)+'][Name]', formVal.HospitalTrasnlations[i].Name);
            body.append('HospitalTrasnlations['+(i)+'][Address]', formVal.HospitalTrasnlations[i].Address);
            body.append('HospitalTrasnlations['+(i)+'][LangCode]', formVal.HospitalTrasnlations[i].LangCode);
            body.append('HospitalTrasnlations['+(i)+'][Description]', formVal.HospitalTrasnlations[i].Description);
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
  closeDialog() {
    this.dialogRef.close(this.newHospitalId);
  }
}

