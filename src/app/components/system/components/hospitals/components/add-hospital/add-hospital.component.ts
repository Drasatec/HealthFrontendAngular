import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddInfoTranslateComponent } from '../add-info-translate/add-info-translate.component';
import { HospitalService } from '../../services/hospital.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ngx-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.scss']
})
export class AddHospitalComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _hospitalservice:HospitalService,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      codeNumber: [null],
      address: [null],
      name:[],
      description:[],
      email:[],
      PhoneNumbers: this._FormBuilder.array([this.createPhoneFormGroup()]),
      whatsAppNumber:[],
    });
  }
  private createPhoneFormGroup(): FormGroup {
    return this._FormBuilder.group({
      'TelephoneNumber': new FormControl(''),

    })
  }
  get phonenumberArray(): FormArray {
    return this.form.get('PhoneNumbers') as FormArray;
  }
  public addPhone() {

    const emails = this.form.get('PhoneNumbers') as FormArray
    emails.push(this.createPhoneFormGroup())
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
  openTranslateDialog(){
    const dialogRef = this.dialog.open(AddInfoTranslateComponent,{
      width: "1200px",
      disableClose: true,
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
      }
    });
  }
  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.prepareDataBeforeSend(this.form.value);
      this._hospitalservice.createHospital(this.sendData).subscribe(
        (res)=>{
          this.snackBar.open("تم اضافة المستشفي بنجاح ", "ُsuccess", {
            duration: 5000,
            panelClass: 'success'
          });
          this.router.navigate(["/dashboard/system/hospitals/all-hospital"]);
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
  sendData;
  prepareDataBeforeSend(data){
    console.log(data)
    let paylod={
      ...data,
      HospitalTrasnlations:[{
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
            body.append('HospitalTrasnlations['+(i)+'][Name]', formVal.HospitalTrasnlations[i].Name);
            body.append('HospitalTrasnlations['+(i)+'][Address]', formVal.HospitalTrasnlations[i].Address);
            body.append('HospitalTrasnlations['+(i)+'][LangCode]', formVal.HospitalTrasnlations[i].LangCode);
            body.append('HospitalTrasnlations['+(i)+'][Description]', formVal.HospitalTrasnlations[i].Description);
          }
        }
        else if (key == "PhoneNumbers") {
          for (let i = 0; i < formVal['PhoneNumbers'].length; i++) {
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
}
