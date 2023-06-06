import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddHospitalComponent } from '../../../hospitals/components/add-hospital/add-hospital.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../../../../environments/environment';
import { HelperService } from '../../../../../../@theme/services/helper.service';
import { AddInfoTranslateComponent } from '../../../hospitals/components/add-info-translate/add-info-translate.component';
import { HospitalService } from '../../../hospitals/services/hospital.service';
import { BuildingService } from '../../services/building.service';

@Component({
  selector: 'ngx-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.scss']
})
export class AddBuildingComponent implements OnInit {
  form: FormGroup;
  imgUrl=`${environment.imgUrl}`;

  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _buildingService:BuildingService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService
  ) {
  }
  id:number;
  hospital:any;
  ngOnInit(): void {
    this.route.params.subscribe(
      (param)=>{
    console.log(param)

        this.id =param.id;
      }
    )
    this.createForm();
    if(this.id){
      this.getHospitalById(this.id);
    }
    this.getHospitals()
  }
  hospitals=[]
  getHospitals(){
    return this.hospitals
  }
  getHospitalById(id){
    let paylod={
      lang:'ar'
    }
    this._buildingService.getHospitalById(id,paylod).subscribe(
      (res:any)=>{
        this.hospital = res;
        this.phoneNumbers=res.phoneNumbers;
        this.patchForm();
      }
    )
  }
  phoneNumbers;
  patchForm(){
    this.form.patchValue({
      codeNumber:this.hospital.codeNumber?this.hospital.codeNumber:null,
      name:this.hospital.hospitalTrasnlations > 0?this.hospital.hospitalTrasnlations[0].name:null,
      hospital:this.hospital.hospitalTrasnlations > 0?this.hospital.hospitalTrasnlations[0].description:null,
  })
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      codeNumber: [null],
      hospital: [null],
      name:[],

    });
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
      if(!this.id){
        this._buildingService.createHospital(this.sendData).subscribe(
          (res)=>{
            this.snackBar.open("تم اضافة المبني بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.router.navigate(["/dashboard/system/buildings/all-building"]);
          },
          (err) => {
            this.snackBar.open("من فضلك حاول مرة اخري", "ُError", {
              duration: 3000,
              panelClass: 'error'
            });

          }
        )
      }else{
        this._buildingService.editHospital(this.id,this.sendData).subscribe(
          (res)=>{
            this.snackBar.open("تم تعديل المبني بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.router.navigate(["/dashboard/system/buildings/view-building",this.id]);
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
    data.PhoneNumbers =
    data?.PhoneNumbers.map((el) => {
      return this._helpservice.deleteNullValues(el);
    });
    console.log(data)
    let paylod={
      ...data,
      HospitalTrasnlations:[{
        id:this.hospital.hospitalTrasnlations[0].id,
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
  openDialog() {
    const dialogRef = this.dialog.open(AddHospitalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
