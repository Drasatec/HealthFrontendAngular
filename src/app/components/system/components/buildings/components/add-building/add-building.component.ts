import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddHospitalComponent } from '../../../hospitals/components/add-hospital/add-hospital.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../../../../environments/environment';
import { HelperService } from '../../../../../../@theme/services/helper.service';
import { AddInfoTranslateComponent } from '../../../hospitals/components/add-info-translate/add-info-translate.component';
import { HospitalService } from '../../../hospitals/services/hospital.service';
import { BuildingService } from '../../services/building.service';
import { LookupService } from '../../../../../../@theme/services/lookup.service';

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
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddBuildingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  id:number;
  building:any;
  loading=false
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
      this.getBuildingById(this.id);
    }
    this.getHospitals()
  }
  hospitals=[]
  getHospitals(){
    let payload={
      pageSize:30
    }
    this._lookpservice.getAllHospitalsNames(payload).subscribe(
      (res)=>{
        this.hospitals = res;
      }
    )
    if(this.data.selectedHos){
      this.form.patchValue({
        HospitalId:this.data.selectedHos
      })
    }
  }
  getBuildingById(id){
    let paylod={
      lang:'ar'
    }
    this._buildingService.getBuildingsById(id,paylod).subscribe(
      (res:any)=>{
        this.building = res;
        this.patchForm();
      }
    )
  }
  phoneNumbers;
  patchForm(){
    this.form.patchValue({
      codeNumber:this.building.codeNumber?this.building.codeNumber:null,
      name:this.building.buildingTranslation.length > 0?this.building.buildingTranslation[0].name:null,
      description:this.building.buildingTranslation.length > 0?this.building.buildingTranslation[0].description:null,
      HospitalId:this.building.hospitalId ?this.building.hospitalId : null
  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      codeNumber: [null],
      HospitalId: [null,Validators.required],
      name:[null,Validators.required],
      description:[null]
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
  newBuildId;

  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){
        this._buildingService.createBuildings(this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.newBuildId = res.id
            this.snackBar.open("تم اضافة المبني بنجاح ", "ُsuccess", {
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
        this._buildingService.editBuildings(this.id,this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.snackBar.open("تم تعديل المبني بنجاح ", "ُsuccess", {
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
      BuildingTranslation:[{
        id:this.id ? this.building.buildingTranslation[0].id:0,
        Name:data.name,
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
        if (key == "BuildingTranslation") {
          for (let i = 0; i < formVal['BuildingTranslation'].length; i++) {
            body.append('BuildingTranslation['+(i)+'][id]', formVal.BuildingTranslation[i].id );
            body.append('BuildingTranslation['+(i)+'][Name]', formVal.BuildingTranslation[i].Name);
            body.append('BuildingTranslation['+(i)+'][Address]', formVal.BuildingTranslation[i].Address);
            body.append('BuildingTranslation['+(i)+'][LangCode]', formVal.BuildingTranslation[i].LangCode);
            body.append('BuildingTranslation['+(i)+'][Description]', formVal.BuildingTranslation[i].Description);
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
  openDialog(){
    const dialogRef = this.dialog.open(AddHospitalComponent,{
      width: "1200px",
      maxHeight:'80%'
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
        this.getHospitals()
      this.form.patchValue({
        'HospitalId':result
      })
      }
    });
  }

}
