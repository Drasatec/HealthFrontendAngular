import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MyCustomPaginatorIntl } from '../../../../../../pages/paginator/paginator.srvice';
export class UserData{
  id:string;
  name:string;
  address:string;
  img:string;
 }
@Component({
  selector: 'ngx-all-hospitals',
  templateUrl: './all-hospitals.component.html',
  styleUrls: ['./all-hospitals.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],

})
export class AllHospitalsComponent implements AfterViewInit{

  displayedColumns: string[] = ['id','name','address','img','action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router:Router) {
    // Create 100 users
    const users = [{id:'0',name:'مستشفي الرحمة',address:'طنطا',img:'kitten-cosmic.png'},
                    {id:'1',name:'مستشفي الرحمة',address:'طنطا',img:'kitten-cosmic.png'}
                  ];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
}

