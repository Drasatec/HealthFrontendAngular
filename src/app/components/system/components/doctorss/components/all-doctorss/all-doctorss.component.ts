import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FloorModel } from '../../../floors/models/floors.model';
import { MatDialog } from '@angular/material/dialog';
import { AddClinicComponent } from '../../../clinics/components/add-clinic/add-clinic.component';
import { AddDoctorssComponent } from '../add-doctorss/add-doctorss.component';
import { DoctorsService } from '../../services/doctors.service';
import { environment } from '../../../../../../../environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddBuildTranslateComponent } from '../../../buildings/components/add-build-translate/add-build-translate.component';
import { AddDoctorTranslateComponent } from '../add-doctor-translate/add-doctor-translate.component';
import { MyCustomPaginatorIntl } from '../../../../../../pages/paginator/paginator.srvice';

@Component({
  selector: 'ngx-all-doctorss',
  templateUrl: './all-doctorss.component.html',
  styleUrls: ['./all-doctorss.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],

})
export class AllDoctorssComponent  implements OnInit{
  imgUrl=`${environment.imgUrl}`;
  timestamp = new Date().getTime();

  dataSource: MatTableDataSource<FloorModel>;
  private subscriptions: Subscription = new Subscription();
  totalItems: number ;
  pageSize: number = 10;
  pageIndex: number = 0;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  filterElements = {
    global_search: true,
    hospitals:true,
    specialtyId:true,
    status:true
  };
  doctors=[]
  loading=false;
  fetch={
    status:'active'
  }
  constructor(
    public dialog: MatDialog,
    private route:Router,
    private _doctorService:DoctorsService,
    public snackBar: MatSnackBar,

    ) {}
  ngOnInit(): void {
    this.getTableData(this.fetch)
  }
  getTableData(fetch){
    let para
      para={
        lang:'ar',
        ...fetch,
        page:this.pageIndex+1,
        pageSize:this.pageSize
      }

    this.subscriptions.add(
      this._doctorService.getAllDoctors(para).subscribe((res: any) => {

      this.doctors = res.data;
      this.dataSource = new MatTableDataSource(this.doctors);
      this.dataSource.paginator = this.paginator;
      this.totalItems = res.total;
      this.loading=false;

      }, err => {
        // this._SnackBarService.openSnackBar('Error, please try again!', 'Error', 'error');
      })

    );
  }
  pageChanged(event: PageEvent) {
    console.log(event)
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getTableData(this.fetch);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openAddDoctors(){
    const dialogRef = this.dialog.open(AddDoctorssComponent,{
      width: "1200px",
      maxHeight:'80%',
      disableClose: true,
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
        this.getTableData(this.fetch)
      }
    });
  }
  status = 'active'
  onFilterChange(e) {
    console.log(e)
    this.status = e.status ? e.status : this.status;

    if((e.status && !e.name)){
      let payload={
        status:e.status ? e.status :this.status,
      }
      console.log(payload)
      this.getTableData(payload)
    }else if( e.hosId){
      let payload={
        hosId : e.hosId
      }
      console.log(payload)
      this.getTableData(payload)
    }else if( e.specialtyId){
      let payload={
        specialtyId : e.specialtyId
      }
      console.log(payload)
      this.getTableData(payload)
    }
    else if(e.name && !e.status){
      let pay={
        searchTerm:e.name,
        lang:'ar'
      }
      this.searchDoctor(pay)
    }
    else{
    this.status='active';
      this.getTableData(this.fetch)
    }
  }
  searchDoctor(pay){
    this._doctorService.SearchDoctor(pay).subscribe(
      (res)=>{
        this.doctors = res.data;
        // console.log(this.rooms)
      this.dataSource = new MatTableDataSource(this.doctors);
      this.dataSource.paginator = this.paginator;
      this.totalItems = res.total;
      this.loading=false;
      }
    )
  }
  rowAction(action,id){
    if(action === 'active' || action ==='inactive'){
      console.log("act")

      this._doctorService.activeDoctor(id,action).subscribe(
        (res: any) => {
          if(action === 'active'){
            this.snackBar.open("تم تفعيل الطبيب بنجاح ", "ُsuccess", {
              duration: 3000,
              panelClass: 'success'
            });
          }else{
            this.snackBar.open("تم ايقاف الطبيب بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
          }

          this.getTableData(this.fetch);
        },
        (err) => {
          this.snackBar.open("من فضلك حاول مرة اخري", "ُError", {
            duration: 3000,
            panelClass: 'error'
          });

        }
      )
    }else if (action === 'edit'){
      console.log("edit")
      this.openEditDialog(id)
    }else if(action === 'translate'){
      this.openTranslateDialog(id);
    }else if(action === 'profile'){
      this.route.navigate(['/dashboard/system/doctorss/doctor-profile/',id]);
    }
  }
  openEditDialog(id){
    const dialogRef = this.dialog.open(AddDoctorssComponent,{
      width: "1200px",
      disableClose: true,
      data:{
        id:id,
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
        this.getTableData(this.fetch)
      }
    });
  }
  translateData;
  openTranslateDialog(id){
    const dialogRef = this.dialog.open(AddDoctorTranslateComponent,{
      width: "1200px",
      disableClose: true,
      data:{
        id:id,
        type:'doctor'
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
        this.getTableData(this.fetch)
      }
    });
  }
  gotoProfile(id){
    this.route.navigate(['/dashboard/system/doctorss/doctor-profile/',id])
  }
}


