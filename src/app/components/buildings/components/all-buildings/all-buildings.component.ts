import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserData } from '../../../hospitals/model/hospital.model';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MyCustomPaginatorIntl } from '../../../../pages/paginator/paginator.srvice';

@Component({
  selector: 'ngx-all-buildings',
  templateUrl: './all-buildings.component.html',
  styleUrls: ['./all-buildings.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],

})
export class AllBuildingsComponent implements AfterViewInit {


  displayedColumns: string[] = ['id','name','address','img','other','action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router:Router) {
    // Create 100 users
    const users = [{id:'0',name:'مستشفي الرحمة',address:'طنطا',other:'الرحمة',img:'kitten-cosmic.png'},
                    {id:'1',name:'مستشفي الرحمة',address:'طنطا',other:'الرحمة',img:'kitten-cosmic.png'}
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
    this.router.navigate(['/dashboard/hospitals/view-building/',id])
  }

}
