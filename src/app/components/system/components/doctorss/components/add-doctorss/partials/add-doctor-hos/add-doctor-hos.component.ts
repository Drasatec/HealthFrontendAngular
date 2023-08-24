import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { HelperService } from '../../../../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../../../../@theme/services/lookup.service';
import { FloorModel } from '../../../../../floors/models/floors.model';
import { DoctorsService } from '../../../../services/doctors.service';
import { AddDoctorssComponent } from '../../add-doctorss.component';

@Component({
  selector: 'ngx-add-doctor-hos',
  templateUrl: './add-doctor-hos.component.html',
  styleUrls: ['./add-doctor-hos.component.scss']
})
export class AddDoctorHosComponent implements OnInit {
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
    console.log(this.data,this.doctorDataOfAdd)
    this.getHospitals()
    if(this.data || this.doctorDataOfAdd)this.getTableData()
    this.createForm();
    this.form.patchValue({
      doctorId:this.data?this.data.id : this.doctorDataOfAdd.id
    })
  }

  hospitals;
getHospitals(){
  let payload={
    pageSize:30,
    
  }
  this._lookpservice.getAllHospitalsNames(payload).subscribe(
    (res)=>{
      this.hospitals = res
    }
  )
}
  

  createForm(): void {
    this.form = this._FormBuilder.group({
      DoctorId:[null],
      hospitalId:[null,Validators.required],

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
        this._doctorService.addDoctorToHos(this.sendData).subscribe(
          (res)=>{
            this.loading=false;

            this.snackBar.open("تم الاضافة بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
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
      }

    }
  }

  sendData;
  prepareDataBeforeSend(data){
    console.log(this.data)

    let paylod={
      ...data,
      doctorId:this.doctorDataOfAdd ? this.doctorDataOfAdd.id : this.data.id
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
  getTableData(fetch?){
    let para
      para={
        ...fetch,
        doctorId:this.doctorDataOfAdd ? this.doctorDataOfAdd.id : this.data.id
      }
      console.log(para)
    this.subscriptions.add(
      this._lookpservice.getAllHospitalsNames(para).subscribe((res: any) => {

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
  rowAction(action,hosId){
    if(action === 'delete'){
      this.deleteVisitPrice(hosId);
    }
  }
  deleteVisitPrice(hosId){
    let doctorId=this.doctorDataOfAdd ?this.doctorDataOfAdd.id:this.data.id
    Swal.fire({
      title: "هل انت متأكد من حذف هذه المستشفي   ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.isConfirmed === true) {
        this._doctorService.deleteDocHos(hosId,doctorId).subscribe(
          (res: any) => {
            
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

}

