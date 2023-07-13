import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../../../../@theme/services/lookup.service';
import { DoctorsService } from '../../../../services/doctors.service';
import { AddDoctorssComponent } from '../../add-doctorss.component';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MyCustomPaginatorIntl } from '../../../../../../../../pages/paginator/paginator.srvice';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FloorModel } from '../../../../../floors/models/floors.model';
import { Subscription } from 'rxjs';
import { Console } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-visit-price',
  templateUrl: './visit-price.component.html',
  styleUrls: ['./visit-price.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],

})
export class VisitPriceComponent implements OnInit {
  @Input() doctorDataOfAdd;
  currancys=[{name:'EGP',id:1},{name:'AED',id:2},{name:'SR',id:3}];
  form: FormGroup;
  loading=false
  private subscriptions: Subscription = new Subscription();

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
  id:number;
  doctor:any;
  edit=false;
  dataSource: MatTableDataSource<FloorModel>;
  totalItems: number ;
  pageSize: number = 10;
  pageIndex: number = 0;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['id','name','priceCat',"typeVisit",'price','action'];

  fetch
  idOfDoctor
  ngOnInit(): void {

    this.getVisitType()
    this.getPriceCategory()
    this.createForm();
    this.getId()

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
  doctorVisitPrice
  getVisitPriceById(id){
    let fetch={
      lang:'ar',
      id:id
    }
    this._doctorService.getDoctorVisit(fetch).subscribe(
      (res)=>{
        this.doctorVisitPrice = res[0]
        this.patchForm()
      }
    )
  }
  visitTypes;
  getVisitType(){
    let payload={
      pageSize:30
    }
    this._lookpservice.getAllVisitTypesNames(payload).subscribe(
      (res)=>{
        this.visitTypes = res
      }
    )
  }
  priceCategorys;
  getPriceCategory(){
  let payload={
    pageSize:30
  }
  this._lookpservice.getAllPriceCategoryNames(payload).subscribe(
    (res)=>{
      this.priceCategorys = res
    }
  )
}

  patchForm(){
    this.form.patchValue({
      DoctorId:this.doctorVisitPrice ? this.doctorVisitPrice.doctorId : null,
      TypeVisitId:this.doctorVisitPrice ? this.doctorVisitPrice.typeVisitId : null,
      PriceCategoryId:this.doctorVisitPrice ? this.doctorVisitPrice.priceCategoryId : null,
      PriceCurrency:this.doctorVisitPrice ? this.doctorVisitPrice.priceCurrency : null,
      Price:this.doctorVisitPrice ? this.doctorVisitPrice.price : null,
  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      DoctorId:[null],
      TypeVisitId:[null,Validators.required],
      PriceCategoryId:[null,Validators.required],
      PriceCurrency:[null,Validators.required],
      Price:[null,Validators.required],
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
        this._doctorService.createVisitPrice(this.sendData).subscribe(
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
        this._doctorService.editDoctorVisit(this.sendData).subscribe(
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
      Id:this.doctorVisitPrice ? this.doctorVisitPrice?.id  : null
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
      this._doctorService.getDoctorVisit(para).subscribe((res: any) => {

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
      this.editVisitType(id)
    }
  }
  deleteVisitPrice(doctorId,id){
    Swal.fire({
      title: "هل انت متأكد من حذف هذا السعر  ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.isConfirmed === true) {
        this._doctorService.deleteDoctorVisit(id).subscribe(
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
  this.getVisitPriceById(id);
  this.edit=true
}
}

