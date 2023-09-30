import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelperService } from '../../../../../../../../@theme/services/helper.service';
import { HospitalService } from '../../../../services/hospital.service';
import { AddInfoTranslateComponent } from '../../../add-info-translate/add-info-translate.component';
import { AddHospitalComponent } from '../../add-hospital.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { id } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { LookupService } from '../../../../../../../../@theme/services/lookup.service';
import { FloorModel } from '../../../../../floors/models/floors.model';
import { AddBuildTranslateComponent } from '../../../../../buildings/components/add-build-translate/add-build-translate.component';

@Component({
  selector: 'ngx-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  form: FormGroup;
  @Input() newHospitalId;
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
    private _hospitalService:HospitalService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddHospitalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getId()
  }

  getId(){
    console.log(this.newHospitalId,this.data.id)
    if(this.newHospitalId){
      this.idOfDoctor =  this.newHospitalId
      this.fetch={
        lang:'ar',
        hosId:this.newHospitalId,
      }
    }

    if(this.data?.id){
      this.fetch={
        lang:'ar',
        hosId:this.data?.id,

      }
      // this.getVisitPrice(this.data?.id)
      this.getTableData(this.fetch)
    }
  }

  patchForm(){
    this.form.patchValue({
      Name:this.doctorPeriod.hospitalFeatureTranslations.length > 0 ? this.doctorPeriod.hospitalFeatureTranslations[0].name : null,
      HospitalId:this.doctorPeriod ? this.doctorPeriod.hospitalId : null,
      description:this.doctorPeriod.hospitalFeatureTranslations.length >0 ? this.doctorPeriod.hospitalFeatureTranslations[0].description : null,
      id:this.doctorPeriod.hospitalFeatureTranslations.length >0 ? this.doctorPeriod.hospitalFeatureTranslations[0].id : null,
    })
  // console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      id:[0],
      Name:[null],
      HospitalId:[this.newHospitalId],
      description:[null,Validators.required],
      LangCode:['ar'],
      file:[null,Validators.required],
    });
  }
  get formControls() {
    return this.form.controls;
  }

  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true;
      console.log(this.form.value)
      this.prepareDataBeforeSend(this.form.value);
      if(!this.edit){
        this._hospitalService.createFeatureHospital(this.sendData).subscribe(
          (res)=>{
            this.loading=false;

            this.snackBar.open("تم الاضافة بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.getId()
            console.log(this.fetch)
            this.getTableData(this.fetch)
            this.form.reset()
          },
          (err) => {
            this.loading=true;

            this.snackBar.open("من فضلك حاول مرة اخري", "ُError", {
              duration: 3000,
              panelClass: 'error'
            });

          }
        )
      }else{
        this._hospitalService.editFeatureHospital(this.doctorPeriod.id,this.sendData).subscribe(
          (res)=>{
            this.loading=false;

            this.snackBar.open("تم التعديل بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.getTableData(this.fetch)
            this.edit=false;
            this.form.reset()
          },
          (err) => {
            this.loading=false;
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
    // console.log(this.data.id)

    let paylod={
      ...data,
      HospitalFeatureTranslations:[{
        Name:data.Name,
        Description:data.description,
        LangCode:'ar',
        id:data.id
      }],
      HospitalId:this.newHospitalId?this.newHospitalId:this.data.id,
      Id:this.doctorPeriod ? this.doctorPeriod?.id  : null,
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
        if (key == "HospitalFeatureTranslations") {
          for (let i = 0; i < formVal['HospitalFeatureTranslations'].length; i++) {
            body.append('HospitalFeatureTranslations['+(i)+'][id]', formVal.HospitalFeatureTranslations[i].id? formVal.HospitalFeatureTranslations[i].id :0);
            body.append('HospitalFeatureTranslations['+(i)+'][Name]', formVal.HospitalFeatureTranslations[i].Name);
            body.append('HospitalFeatureTranslations['+(i)+'][LangCode]', formVal.HospitalFeatureTranslations[i].LangCode);
            body.append('HospitalFeatureTranslations['+(i)+'][Description]', formVal.HospitalFeatureTranslations[i].Description);
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

  pageChanged(event: PageEvent) {
    // console.log(event)
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getTableData(this.fetch);
  }
  visitPriceData:any;
  getTableData(fetch){
    let para
      para={
        ...fetch,
        // page:this.pageIndex+1,
        // pageSize:this.pageSize
      }

    this.subscriptions.add(
      this._hospitalService.featuresHospital(para).subscribe((res: any) => {

      this.visitPriceData = res.data;
      // console.log(this.visitPriceData);

      this.dataSource = new MatTableDataSource(this.visitPriceData);
      this.dataSource.paginator = this.paginator;
      this.totalItems = res.total;

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
  rowAction(action,id,doctorId){
    console.log(id)
    if(action === 'delete'){
      this.deleteVisitPrice(id);
    }else if(action === 'edit'){
      this.editVisitType(id)
    }else if(action === 'translate'){
      this.translateVisitType(id)
    }
  }
  translateVisitType(id){
      const dialogRef = this.dialog.open(AddBuildTranslateComponent,{
        width: "1200px",
        disableClose: true,
        data:{
          id:id,
          type:'features'

        }
      })
      dialogRef.afterClosed().subscribe((result) => {
        // console.log(result)
        if(result){
          this.getTableData(this.fetch)
        }
      });
  }
  deleteVisitPrice(id){
    Swal.fire({
      title: "هل انت متأكد من حذف هذه الميزة  ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.isConfirmed === true) {
        this._hospitalService.deleteFeature(id).subscribe(
          (res: any) => {
            if(res.success ==true){
              this.getTableData(this.fetch);
            }else{
              this.snackBar.open(" احذف الترجمات اولا ", "ُError", {
                duration: 3000,
                panelClass: 'error'
              });
  
            }
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
editVisitType(id){
  this.getPeriodById(id);
  this.edit=true
}
doctorPeriod
getPeriodById(id){
  let fetch={
    lang:'ar'
  }
  this._hospitalService.getFeatureById(id,fetch).subscribe(
    (res)=>{
      this.doctorPeriod = res
      // console.log(this.doctorPeriod)
      // this.getClinics(this.doctorPeriod)

      this.patchForm()
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

