import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { MyCustomPaginatorIntl } from '../../../../../../pages/paginator/paginator.srvice';
import { AddInfoTranslateComponent } from '../../../hospitals/components/add-info-translate/add-info-translate.component';
import { HospitalModel } from '../../../hospitals/models/hospital.model';
import { PatientTranslationComponent } from '../../patient-translation/patient-translation.component';

@Component({
  selector: 'ngx-all-patient',
  templateUrl: './all-patient.component.html',
  styleUrls: ['./all-patient.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],

})
export class AllPatientComponent implements OnInit {
  imgUrl=`${environment.imgUrl}`;
  displayedColumns: string[] = ['id','name','address','gender','bd','action'];
  dataSource: MatTableDataSource<HospitalModel>;
  private subscriptions: Subscription = new Subscription();
  totalItems: number ;
  pageSize: number = 10;
  pageIndex: number = 0;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  filterElements = {
    global_search: true,
    status:false
  };
  loading=true;
  constructor(private router:Router,private _patientservice:PatientService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) {

  }
  fetch={
    pageIndex:1,
    pageSize:10,
  }
  status:string='active';
  timestamp = new Date().getTime();

  ngOnInit() {
    this.getTableData(this.status)
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // console.log(this.length,this.pageIndex,this.pageSize)
  }
  pageChanged(event: PageEvent) {
    console.log(event)
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getTableData(this.status);
  }
  hospitals:any;
  getTableData(status){
    let para
      para={
        lang:'ar',
        status:status,
        page:this.pageIndex+1,
        pageSize:this.pageSize
      }

    this.subscriptions.add(
      this._patientservice.getAllPatients(para).subscribe((res: any) => {

      this.hospitals = res.data;
      this.dataSource = new MatTableDataSource(this.hospitals);
      this.dataSource.paginator = this.paginator;
      this.totalItems = res.total;
      this.loading=false;

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
  rowAction(action,id){
    console.log(id)

    if (action === 'edit'){
      this.openEditDialog(id)
    }else if(action === 'translate'){
      this.openTranslateDialog(id);
    }
  }
  openEditDialog(id){
    const dialogRef = this.dialog.open(AddPatientComponent,{
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
    const dialogRef = this.dialog.open(PatientTranslationComponent,{
      width: "1200px",
      disableClose: true,
      data:id
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
        this.getTableData(this.status)
      }
    });
  }
  openAddHospital(){
    const dialogRef = this.dialog.open(AddPatientComponent,{
      width: "1200px",
      maxHeight:'80%',
      disableClose: true,
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
        this.getTableData(this.status)
      }
    });
  }
  onClickPublisher(id){
    console.log(id)
    this.router.navigate(['/system/hospitals/view-hospital/',id])
  }
  searchHospital(pay){
    this._patientservice.SearchPatient(pay).subscribe(
      (res)=>{
        this.hospitals = res.data;
        console.log(this.hospitals)
      this.dataSource = new MatTableDataSource(this.hospitals);
      this.dataSource.paginator = this.paginator;
      this.totalItems = res.total;
      this.loading=false;
      }
    )
  }
  onFilterChange(e) {
    console.log(e.target)
    this.status = e.status;

    if(e.status && !e.name){
      this.getTableData(e.status)
    }
    else if(e.name && !e.status){
      let pay={
        searchTerm:e.name,
        lang:'ar'
      }
      this.searchHospital(pay)
    }
    else{
    this.status='active';
      this.getTableData(this.status)
    }
  }

}

