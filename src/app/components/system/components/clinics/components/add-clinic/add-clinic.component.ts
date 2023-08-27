import { Component, Inject, OnInit } from '@angular/core';
import { ClinicService } from '../../services/clinic.service';
import { LookupService } from '../../../../../../@theme/services/lookup.service';
import { AddSpecialComponent } from '../../../specialities/components/add-special/add-special.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { HelperService } from '../../../../../../@theme/services/helper.service';
import { AddInfoTranslateComponent } from '../../../hospitals/components/add-info-translate/add-info-translate.component';
import { AddRoomComponent } from '../../../rooms/components/add-room/add-room.component';

@Component({
  selector: 'ngx-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.scss']
})
export class AddClinicComponent implements OnInit {
  form: FormGroup;
  imgUrl=`${environment.imgUrl}`;
  appears=[{name:'يظهر' ,value:true},{name:'يختفي' ,value:false}]
  loading=false
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _clinicService:ClinicService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  id:number;
  clinic:any;
  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (param)=>{
    // console.log(param)

    //     this.id =param.id;
    //   }
    // )
    this.id=this.data ? this.data.id : null
    this.createForm();
    if(this.id){
      this.getClinicById(this.id);
    }
    this.getHospitals()
    this.getSpecials()
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
  specials;
  getSpecials(){
    let payload={
      pageSize:30
    }
    this._lookpservice.getAllSpecialNames(payload).subscribe(
      (res)=>{
        this.specials = res
      }
    )
  }
  getClinicById(id){
    let paylod={
      lang:'ar'
    }
    this._clinicService.getClinicById(id,paylod).subscribe(
      (res:any)=>{
        this.clinic = res;
        this.chooseBuilding('',this.clinic.hospitalId)
        this.chooseFloor('',this.clinic.buildId)
        this.chooseRoom('',this.clinic.floorId)

        this.patchForm();
      }
    )
  }

  patchForm(){
    this.form.patchValue({
      codeNumber:this.clinic.codeNumber?this.clinic.codeNumber:null,
      name:this.clinic.clinicTranslations.length > 0?this.clinic.clinicTranslations[0].name:null,
      description:this.clinic.clinicTranslations.length > 0?this.clinic.clinicTranslations[0].description:null,
      HospitalId:this.clinic.hospitalId ?this.clinic.hospitalId : null,
      BuildId:this.clinic.buildId ?this.clinic.buildId : null,
      FloorId:this.clinic.floorId ?this.clinic.floorId : null,
      RoomId:this.clinic.roomId ?this.clinic.roomId : null,
      SpecialtyId:this.clinic.specialtyId ?this.clinic.specialtyId : null,
      Phone:this.clinic.phone ?this.clinic.phone : null,
      WorkingHours:this.clinic.workingHours ?this.clinic.workingHours : null,
      Appearance:this.clinic.appearance ?this.clinic.appearance : false,

  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      codeNumber: [null],
      HospitalId: [null,Validators.required],
      BuildId:[null,Validators.required],
      FloorId:[null,Validators.required],
      RoomId:[null,Validators.required],
      SpecialtyId:[null,Validators.required],
      name:[null,Validators.required],
      description:[null],
      Phone:[null],
      Appearance:[null],
      WorkingHours:[null],
    });
  }
  get formControls() {
    return this.form.controls;
  }
  clearHos(){
    console.log("cleeean")
    this.form.patchValue({
      HospitalId: null,
      BuildId:null,
      FloorId:null,
      RoomId:null
    })
    this.buildings=[];

  }
  cleanBuild(){
    this.form.patchValue({
      BuildId:null,
      FloorId:null,
      RoomId:null
    })
    this.floors=[];

  }
  cleanFloor(){
    this.form.patchValue({
      RoomId:null
    })
    this.rooms=[];

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
  newClinicId;
  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){

        this._clinicService.createClinic(this.sendData).subscribe(
          (res)=>{
            this.loading=false
              this.newClinicId=res.id;
              this.snackBar.open("تم اضافة العيادة بنجاح ", "ُsuccess", {
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
        this._clinicService.editClinic(this.id,this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.snackBar.open("تم تعديل العيادة بنجاح ", "ُsuccess", {
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
    this.dialogRef.close(this.newClinicId);
  }
  closeEditDialog() {
    this.dialogRef.close({isAdd:true});
  }

  sendData;
  prepareDataBeforeSend(data){
    console.log(data)
    let paylod={
      ...data,
      ClinicTranslations:[{
        id:this.id ? this.clinic.clinicTranslations[0].id:0,
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
        if (key == "ClinicTranslations") {
          for (let i = 0; i < formVal['ClinicTranslations'].length; i++) {
            if(this.id){body.append('ClinicTranslations['+(i)+'][id]', formVal.ClinicTranslations[i].id );}
            body.append('ClinicTranslations['+(i)+'][Name]', formVal.ClinicTranslations[i].Name);
            body.append('ClinicTranslations['+(i)+'][LangCode]', formVal.ClinicTranslations[i].LangCode);
            body.append('ClinicTranslations['+(i)+'][Description]', formVal.ClinicTranslations[i].Description);
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
    const dialogRef = this.dialog.open(AddSpecialComponent,{
      width: "1200px",
      data:{
        selectedHos:this.selectedHosId,
        selectedBuild:this.selectedBuildId
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
        this.chooseFloor('',this.selectedBuildId)
      this.form.patchValue({
        'FloorId':result
      })
      }
    });
  }
  buildFetch;
  selectedHosId;
  chooseBuilding(e,id?){
    this.selectedHosId=e.hospitalId ? e.hospitalId : id;

    this.buildFetch={
      hosId:e.hospitalId ? e.hospitalId : id
    }
    this._lookpservice.getAllBuildingsNames(this.buildFetch).subscribe(
      (res)=>{
        this.buildings=res
      }
    )
  }
  selectedBuildId;
  floorFetch;
  floors;
  chooseFloor(e,id?){
    this.selectedBuildId=e.buildeingId ? e.buildeingId : id

    this.floorFetch={
      buildId:e.buildeingId ? e.buildeingId : id
    }
    this._lookpservice.getAllFloorssNames(this.floorFetch).subscribe(
      (res)=>{
        this.floors=res
      }
    )
  }
  selectedFloorId
  roomFetch
  rooms
  chooseRoom(e,id?){
    this.selectedFloorId=e.floorId ? e.floorId : id

    this.roomFetch={
      floorId:e.floorId ? e.floorId : id
    }
    this._lookpservice.getAllRoomsNames(this.roomFetch).subscribe(
      (res)=>{
        this.rooms=res
      }
    )
  }
}

