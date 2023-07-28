import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from '../../../../../buildings/components/all-buildings/all-buildings.component';
import { DoctorsService } from '../../../../services/doctors.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { HelperService } from '../../../../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../../../../@theme/services/lookup.service';
import { FloorModel } from '../../../../../floors/models/floors.model';
import { AddDoctorssComponent } from '../../add-doctorss.component';
import { environment } from '../../../../../../../../../environments/environment';
import * as FileSaver from "file-saver";

@Component({
  selector: 'ngx-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  form: FormGroup;
  @Input() doctorDataOfAdd;
  private subscriptions: Subscription = new Subscription();
  fetch
  idOfDoctor
  id:number;
  doctor:any;
  edit=false;
  dataSource: MatTableDataSource<FloorModel>;
  totalItems: number ;
  pageSize: number = 10;
  pageIndex: number = 0;
  loading=false;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['id','name','action'];

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

  ngOnInit(): void {
    this.createForm();
    this.getId()
  }

  getId(){
    if(this.doctorDataOfAdd){
      this.idOfDoctor =  this.doctorDataOfAdd.id
      this.fetch={
        docId:this.doctorDataOfAdd.id,
      }
    }

    if(this.data?.id){
      this.fetch={
        docId:this.data?.id,

      }
      console.log(this.fetch)
      this.getTableData(this.fetch)
    }
  }

  patchForm(){
    this.form.patchValue({
      DoctorId:this.doctorAttach ? this.doctorAttach.doctorId : null,
      Title:this.doctorAttach ? this.doctorAttach.title : null,

  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      DoctorId:[null],
      Title:[null,Validators.required],
    });
  }
  get formControls() {
    return this.form.controls;
  }

  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true
      this.prepareDataBeforeSend(this.form.value);
      if(!this.edit){
        this._doctorService.uploadAttachment(this.sendData).subscribe(
          (res)=>{
            this.loading=false

            this.snackBar.open("تم الاضافة بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.getId()
            console.log(this.fetch)
            this.getTableData(this.fetch)
            this.form.reset()
            this.files=[]
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
        this._doctorService.editAttachment(this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.snackBar.open("تم التعديل بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.getTableData(this.fetch)
            this.edit=false;
            this.form.reset()
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
    console.log(this.data)

    let paylod={
      ...data,
      DoctorId:this.doctorDataOfAdd?this.doctorDataOfAdd.id:this.data.id,
      Id:this.doctorAttach ? this.doctorAttach?.id  : 0,
      file:this.files[0]
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
        body.append(key, formVal[key]);
      }
    });
    return body;
  }
  cancel(){
    this.form.reset()
  }

  pageChanged(event: PageEvent) {
    console.log(event)
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getTableData(this.fetch);
  }
  AttachmentData:any;
  getTableData(fetch){
    let para
      para={
        ...fetch,
        // page:this.pageIndex+1,
        // pageSize:this.pageSize
      }

    this.subscriptions.add(
      this._doctorService.getAllAttachment(para).subscribe((res: any) => {

      this.AttachmentData = res;
      console.log(this.AttachmentData);

      this.dataSource = new MatTableDataSource(this.AttachmentData);
      // this.dataSource.paginator = this.paginator;
      // this.totalItems = res.total;

      }, err => {
        // this._SnackBarService.openSnackBar('Error, please try again!', 'Error', 'error');
      })

    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  rowAction(action,id,doctorId?){
    if(action === 'delete'){
      this.deleteAttachment(doctorId,id);
    }else if(action === 'edit'){
      this.editAttachment(id)
    }else if(action === 'view'){
      this.viewAttachment(id)
    }
  }
  deleteAttachment(doctorId,id){
    Swal.fire({
      title: "هل انت متأكد من حذف هذا المرفق  ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.isConfirmed === true) {
        this._doctorService.deleteAttachment(id).subscribe(
          (res: any) => {
            this.fetch={
              docId:doctorId,
            }
            this.getTableData(this.fetch);
          },
          (err) => {
            this.snackBar.open("حاول مرة اخري", "ُError", {
              duration: 3000,
              panelClass: 'error'
            });

          }
        )
      }

      // Remove Deleted Academic From List & Update the Service Academic Years
    });
  }
  viewAttachment(id){
    this.getAttachmentId(id)
    // this.showAttach(this.attachName)

  }
  attachLink =`${environment.showAttach}Files/`

  showAttach(name){
    window.open(this.attachLink+name, "_blank");
    var blob = new Blob([this.attachLink+name], { type: "application/pdf" });
    FileSaver.saveAs(blob, name);
  }
editAttachment(id){
  this.getAttachmentId(id);
  this.edit=true;
  this.patchForm()
}
doctorAttach
attachName
getAttachmentId(id){
  let fetch={
    id:id
  }
  this._doctorService.getAttachmentById(fetch).subscribe(
    (res)=>{
      this.doctorAttach = res
      // console.log(this.doctorAttach,res)
      this.attachName=this.doctorAttach.attachFileName
      this.showAttach(this.attachName)
    }
  )
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
