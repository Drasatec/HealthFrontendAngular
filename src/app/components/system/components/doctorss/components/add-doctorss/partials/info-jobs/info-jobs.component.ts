import { Component, EventEmitter, Inject, Input, OnInit, Output, AfterViewInit, AfterContentChecked, AfterContentInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../../../environments/environment';
import { HelperService } from '../../../../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../../../../@theme/services/lookup.service';
import { DoctorsService } from '../../../../services/doctors.service';
import { AddDoctorTranslateComponent } from '../../../add-doctor-translate/add-doctor-translate.component';
import { AddDoctorssComponent } from '../../add-doctorss.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { FloorModel } from '../../../../../floors/models/floors.model';

@Component({
  selector: 'ngx-info-jobs',
  templateUrl: './info-jobs.component.html',
  styleUrls: ['./info-jobs.component.scss']
})
export class InfoJobsComponent implements OnInit {
  form: FormGroup;
  @Input() doctorDataOfAdd;
  currancys=[{name:'EGP',id:1},{name:'AED',id:2},{name:'SR',id:3}];
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
  displayedColumns: string[] = ['id','name',"hospital","clinic","day","period",'action'];

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

    this.getHospitals()
    this.getWorkingPeriods()
    this.getWorkWeek()
    this.createForm();
    this.getId()
  }
  clinics;
  getClinics(data){
    // console.log(data)
    let payload={
      pageSize:30,
      hosId:data.hospitalId
    }
    this._lookpservice.getAllClinicsNames(payload).subscribe(
      (res)=>{
        this.clinics = res
      }
    )
  }
  hospitals;
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
workingPeriods;
getWorkingPeriods(){
  let payload={
    pageSize:30
  }
  this._lookpservice.getAllWorkingPeriodNames(payload).subscribe(
    (res)=>{
      this.workingPeriods = res
    }
  )
}
workWeek;
getWorkWeek(){
  let payload={
    pageSize:30
  }
  this._lookpservice.getAllWorkWeek(payload).subscribe(
    (res)=>{
      this.workWeek = res
    }
  )
}


  getId(){
    if(this.doctorDataOfAdd){
      this.idOfDoctor =  this.doctorDataOfAdd.id
      this.fetch={
        lang:'ar',
        docId:this.doctorDataOfAdd.id,
      }
    }

    if(this.data?.id){
      this.fetch={
        lang:'ar',
        docId:this.data?.id,

      }
      // this.getVisitPrice(this.data?.id)
      this.getTableData(this.fetch)
    }
  }

  patchForm(){
    this.form.patchValue({
      DoctorId:this.doctorPeriod ? this.doctorPeriod.doctorId : null,
      HospitalId:this.doctorPeriod ? this.doctorPeriod.hospitalId : null,
      ClinicId:this.doctorPeriod ? this.doctorPeriod.clinicId : null,
      WorkingPeriodId:this.doctorPeriod ? this.doctorPeriod.workingPeriodId : null,
      onDay:this.doctorPeriod ? this.doctorPeriod.onDay : null,
  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      DoctorId:[null],
      HospitalId:[null,Validators.required],
      ClinicId:[null,Validators.required],
      WorkingPeriodId:[null,Validators.required],
      onDay:[null,Validators.required],
    });
  }
  get formControls() {
    return this.form.controls;
  }

  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true;
      this.prepareDataBeforeSend(this.form.value);
      if(!this.edit){
        this._doctorService.createPeriod(this.sendData).subscribe(
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
        this._doctorService.editDoctorPeriod(this.sendData).subscribe(
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
    console.log(this.data)

    let paylod={
      ...data,
      DoctorId:this.doctorDataOfAdd?this.doctorDataOfAdd.id:this.data.id,
      Id:this.doctorPeriod ? this.doctorPeriod?.id  : null
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
  visitPriceData:any;
  getTableData(fetch){
    let para
      para={
        ...fetch,
        // page:this.pageIndex+1,
        // pageSize:this.pageSize
      }

    this.subscriptions.add(
      this._doctorService.getDoctorPeriod(para).subscribe((res: any) => {

      this.visitPriceData = res;
      console.log(this.visitPriceData);

      this.dataSource = new MatTableDataSource(this.visitPriceData);
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
  rowAction(action,id,doctorId){
    if(action === 'delete'){
      this.deleteVisitPrice(doctorId,id);
    }else if(action === 'edit'){
      this.editVisitType(doctorId)
    }
  }
  deleteVisitPrice(doctorId,id){
    Swal.fire({
      title: "هل انت متأكد من حذف هذه الفترة  ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.isConfirmed === true) {
        this._doctorService.deleteDoctorPeriod(id).subscribe(
          (res: any) => {
            this.fetch={
              lang:'ar',
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
editVisitType(id){
  this.getPeriodById(id);
  this.edit=true
}
doctorPeriod
getPeriodById(id){
  let fetch={
    lang:'ar',
    docId:id
  }
  this._doctorService.getDoctorPeriod(fetch).subscribe(
    (res)=>{
      this.doctorPeriod = res[0]
      console.log(this.doctorPeriod)
      this.getClinics(this.doctorPeriod)

      this.patchForm()
    }
  )
}
}

