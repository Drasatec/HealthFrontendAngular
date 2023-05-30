import { environment } from './../../../../../../../environments/environment';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorIntl, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MyCustomPaginatorIntl } from '../../../../../../pages/paginator/paginator.srvice';
import { HospitalService } from '../../services/hospital.service';
import { Subscription } from 'rxjs';
import { HospitalModel } from '../../models/hospital.model';

@Component({
  selector: 'ngx-all-hospitals',
  templateUrl: './all-hospitals.component.html',
  styleUrls: ['./all-hospitals.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],

})
export class AllHospitalsComponent implements OnInit{
  imgUrl=`${environment.imgUrl}`;
  displayedColumns: string[] = ['id','name','address','img','action'];
  dataSource: MatTableDataSource<HospitalModel>;
  private subscriptions: Subscription = new Subscription();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  filterElements = {
    global_search: true,

  };

  fetchCriteria ={
    keyword:'',
    page:1,
    pageSize:3,
    lang:'ar'
  }
  pagePaginator={
    length :0,
    pageSize : 10,
    pageIndex : 0,
  }
  constructor(private router:Router,private _hospitalservice:HospitalService
    ) {

  }

  ngOnInit() {
    this.getTableData()
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  hospitals:any;
  getTableData(event?){
    console.log(event)
    this.subscriptions.add(
      this._hospitalservice.getAllHospitals().subscribe((res: any) => {
        console.log(res)
        this.hospitals = res;
      this.dataSource = new MatTableDataSource(this.hospitals);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      }, err => {
        // this._SnackBarService.openSnackBar('Error, please try again!', 'Error', 'error');
      })

    );
  }
  getServerData(e){
    // console.log(e)
    // this.fetchCriteria={
    //   pageSize : e.pageSize,
    //   page : e.pageIndex,
    //   lang:this.fetchCriteria.lang,
    //   keyword:''
    // }
    // this.getTableData(e)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  rowAction(action){

  }
  onClickPublisher(id){
    console.log(id)
    this.router.navigate(['/dashboard/system/hospitals/view-hospital/',id])
  }
  onFilterChange(e) {
  }
}

