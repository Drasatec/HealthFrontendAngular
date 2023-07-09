import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { HelperService } from '../../../../../../@theme/services/helper.service';
import { AddBuildingComponent } from '../../../buildings/components/add-building/add-building.component';
import { AddInfoTranslateComponent } from '../../../hospitals/components/add-info-translate/add-info-translate.component';
import { FloorService } from '../../services/floor.service';
import { LookupService } from '../../../../../../@theme/services/lookup.service';

@Component({
  selector: 'ngx-add-floor',
  templateUrl: './add-floor.component.html',
  styleUrls: ['./add-floor.component.scss']
})
export class AddFloorComponent implements OnInit {
  form: FormGroup;
  imgUrl=`${environment.imgUrl}`;
  loading=false
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _floorService:FloorService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddFloorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  id:number;
  floor:any;
  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (param)=>{
    // console.log(param)

    //     this.id =param.id;
    //   }
    // )
    this.id=this.data ? this.data.id :null;
    this.createForm();
    if(this.id){
      this.getFloorById(this.id);
    }
    this.getHospitals()
    if(this.data.selectedBuild && this.data.selectedHos){
      this.chooseBuilding('', this.data.selectedHos)
      this.form.patchValue({
        HospitalId:this.data.selectedHos,
        BuildId:this.data.selectedBuild
      })
    }
  }
  buildings=[]

  hospitals=[]
  getHospitals(){
    let payload={
      pageSize:30
    }
    this._lookpservice.getAllHospitalsNames(payload).subscribe(
      (res)=>{
        this.hospitals = res
      }
    )
  }
  getFloorById(id){
    let paylod={
      lang:'ar'
    }
    this._floorService.getFloorById(id,paylod).subscribe(
      (res:any)=>{
        this.floor = res;
        this.chooseBuilding('',this.floor.hospitalId)
        this.patchForm();
      }
    )
  }
  phoneNumbers;
  patchForm(){
    this.form.patchValue({
      codeNumber:this.floor.codeNumber?this.floor.codeNumber:null,
      name:this.floor.floorTranslations.length > 0?this.floor.floorTranslations[0].name:null,
      description:this.floor.floorTranslations.length > 0?this.floor.floorTranslations[0].description:null,
      HospitalId:this.floor.hospitalId ?this.floor.hospitalId : null,
      BuildId:this.floor.buildId ?this.floor.buildId : null

  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      codeNumber: [null],
      HospitalId: [null],
      BuildId:[null],
      name:[null],
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
  newFloorId;
  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){

        this._floorService.createFloor(this.sendData).subscribe(
          (res)=>{
            this.loading=false
              this.newFloorId=res.id;
              this.snackBar.open("تم اضافة الطابق بنجاح ", "ُsuccess", {
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
        this._floorService.editFloor(this.id,this.sendData).subscribe(
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
    this.dialogRef.close(this.newFloorId);
  }
  closeEditDialog() {
    this.dialogRef.close({isAdd:true});
  }
  sendData;
  prepareDataBeforeSend(data){
    console.log(data)
    let paylod={
      ...data,
      FloorTranslations:[{
        id:this.id ? this.floor.floorTranslations[0].id:0,
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
        if (key == "FloorTranslations") {
          for (let i = 0; i < formVal['FloorTranslations'].length; i++) {
            if(this.id){body.append('FloorTranslations['+(i)+'][id]', formVal.FloorTranslations[i].id );}
            body.append('FloorTranslations['+(i)+'][Name]', formVal.FloorTranslations[i].Name);
            body.append('FloorTranslations['+(i)+'][LangCode]', formVal.FloorTranslations[i].LangCode);
            body.append('FloorTranslations['+(i)+'][Description]', formVal.FloorTranslations[i].Description);
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
    const dialogRef = this.dialog.open(AddBuildingComponent,{
      width: "1200px",
      maxHeight:'80%',
      data:{
        selectedHos:this.selectedHosId
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
        this.chooseBuilding('',this.selectedHosId)
      this.form.patchValue({
        'BuildId':result
      })
      }
    });
  }
  buildFetch;
  selectedHosId;
  chooseBuilding(e,id?){
    console.log(e.id)
    this.selectedHosId = e.hospitalId ? e.hospitalId : id;
    this.buildFetch={
      hosId:e.hospitalId ? e.hospitalId : id
    }
    this._lookpservice.getAllBuildingsNames(this.buildFetch).subscribe(
      (res)=>{
        this.buildings=res
      }
    )
  }
}
