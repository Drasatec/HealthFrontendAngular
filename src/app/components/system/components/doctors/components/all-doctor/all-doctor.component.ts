import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserData } from '../../../buildings/components/all-buildings/all-buildings.component';
import { MyCustomPaginatorIntl } from '../../../../../../pages/paginator/paginator.srvice';

@Component({
  selector: 'ngx-all-doctor',
  templateUrl: './all-doctor.component.html',
  styleUrls: ['./all-doctor.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],

})
export class AllDoctorComponent implements AfterViewInit {


  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filterElements = {
    global_search: true,
    hospitals:true,
    specialize:true
  };
  users=[]
  constructor(private router:Router) {
    // Create 100 users
     this.users = [
      {
        id:'0',
        name:'دكتور محمد علي',
        specialize:'قلب',
        img:'kitten-cosmic.png',
        description:'معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب',
        phone:'(123)765-5437',
      },
      {
        id:'0',
        name:'دكتور محمد علي',
        specialize:'باطن',
        img:'kitten-cosmic.png',
        description:'معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب',
        phone:'(123)765-5437',
      },
      {
        id:'0',
        name:'دكتور محمد علي',
        specialize:'باطن',
        img:'kitten-cosmic.png',
        description:'معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب',
        phone:'(123)765-5437',
      },
      {
        id:'0',
        name:'دكتور محمد علي',
        specialize:'باطن',
        img:'kitten-cosmic.png',
        description:'معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب معلومات حول هذه الطبيب',
        phone:'(123)765-5437',
      },
    ];

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onFilterChange(e) {
  }
}


