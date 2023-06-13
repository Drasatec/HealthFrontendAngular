import { Component, Inject, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { AddInfoTranslateComponent } from '../../../hospitals/components/add-info-translate/add-info-translate.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { HelperService } from '../../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../../@theme/services/lookup.service';
import { AddBuildingComponent } from '../../../buildings/components/add-building/add-building.component';
import { AddFloorComponent } from '../../../floors/components/add-floor/add-floor.component';

@Component({
  selector: 'ngx-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {
  form: FormGroup;
  imgUrl=`${environment.imgUrl}`;

  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _roomService:RoomService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  id:number;
  room:any;
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
      this.getRoomById(this.id);
    }
    this.getHospitals()
    this.getRoomTypes()
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
  getRoomById(id){
    let paylod={
      lang:'ar'
    }
    this._roomService.getRoomById(id,paylod).subscribe(
      (res:any)=>{
        this.room = res;
        this.chooseBuilding('',this.room.buildId)
        this.chooseFloor('',this.room.floorId)
        this.patchForm();
      }
    )
  }
  roomTypes=[];
  getRoomTypes(){
    this.roomTypes =[
      {id:1,name:'مخزن'},
      {id:2,name:'كشف'},
      {id:3,name:'عيادة'},
      {id:4,name:'صيدلية'},
      {id:5,name:'معمل'},

    ]
    return this.roomTypes
  }
  phoneNumbers;
  patchForm(){
    this.form.patchValue({
      codeNumber:this.room.codeNumber?this.room.codeNumber:null,
      name:this.room.roomTranslations.length > 0?this.room.roomTranslations[0].name:null,
      description:this.room.roomTranslations.length > 0?this.room.roomTranslations[0].description:null,
      HospitalId:this.room.hospitalId ?this.room.hospitalId : null,
      BuildId:this.room.buildId ?this.room.buildId : null,
      FloorId:this.room.floorId ?this.room.floorId : null,
      RoomTypeId:this.room.roomTypeId ? this.room.roomTypeId :null

  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      codeNumber: [null],
      HospitalId: [null],
      BuildId:[null],
      FloorId:[null],
      name:[null],
      description:[null],
      RoomTypeId:[null]
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
  newRoomId;
  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){

        this._roomService.createRoom(this.sendData).subscribe(
          (res)=>{
              this.newRoomId=res.id;
              this.snackBar.open("تم اضافة الغرفة بنجاح ", "ُsuccess", {
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
        this._roomService.editRoom(this.id,this.sendData).subscribe(
          (res)=>{
            this.snackBar.open("تم تعديل الغرفة بنجاح ", "ُsuccess", {
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
    this.dialogRef.close(this.newRoomId);
  }
  closeEditDialog() {
    this.dialogRef.close({isAdd:true});
  }
  sendData;
  prepareDataBeforeSend(data){
    console.log(data)
    let paylod={
      ...data,
      RoomTranslations:[{
        id:this.id ? this.room.roomTranslations[0].id:0,
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
        if (key == "RoomTranslations") {
          for (let i = 0; i < formVal['RoomTranslations'].length; i++) {
            if(this.id){body.append('RoomTranslations['+(i)+'][id]', formVal.RoomTranslations[i].id );}
            body.append('RoomTranslations['+(i)+'][Name]', formVal.RoomTranslations[i].Name);
            body.append('RoomTranslations['+(i)+'][LangCode]', formVal.RoomTranslations[i].LangCode);
            body.append('RoomTranslations['+(i)+'][Description]', formVal.RoomTranslations[i].Description);
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
    const dialogRef = this.dialog.open(AddFloorComponent,{
      width: "1200px",
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
        // this.chooseFloor('',result)
      this.form.patchValue({
        'FloorId':result
      })
      }
    });
  }
  buildFetch;
  chooseBuilding(e,id?){
    console.log(e.id)

    this.buildFetch={
      hosId:e.hospitalId ? e.hospitalId : id
    }
    this._lookpservice.getAllBuildingsNames(this.buildFetch).subscribe(
      (res)=>{
        this.buildings=res
      }
    )
  }
  floorFetch;
  chooseFloor(e,id?){
    console.log(e.id)

    this.floorFetch={
      buildId:e.buildeingId ? e.buildeingId : id
    }
    this._lookpservice.getAllFloorssNames(this.floorFetch).subscribe(
      (res)=>{
        this.buildings=res
      }
    )
  }
}

