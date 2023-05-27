import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MyCustomPaginatorIntl } from '../../../../../pages/paginator/paginator.srvice';
export class UserData{
  id:string;
  name:string;
  address:string;
  img:string;
 }
@Component({
  selector: 'ngx-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],

})
export class AllBookingsComponent implements OnInit,AfterViewInit {
  form: FormGroup;
  ngModelDate = new Date();
  patients=[
    {id:0,name:'محمد علي'},
    {id:1,name:' احمد محمود'},
    {id:2,name:' اسماعيل السيد'},
    {id:2,name:'عبد الله علي'},

  ]
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
     // Create 100 users
     const users = [
      {id:'0',name:' الرحمة',address:'طنطا',img:'kitten-cosmic.png'},
     {id:'1',name:'مستشفي الرحمة',address:'طنطا',img:'kitten-cosmic.png'}
   ];

// Assign the data to the data source for the table to render
this.dataSource = new MatTableDataSource(users);
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      patient: [null],
      doctor: [null,Validators.required],
      clinic: [null],
      date:[],
    });
  }
  get formControls() {
    return this.form.controls;
  }

  displayedColumns: string[] = ['id','name','address','img','action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


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
    this.router.navigate(['/dashboard/booking/edit-booking/1'])
  }
  onClickPublisher(id){
    console.log(id)
    this.router.navigate(['/dashboard/hospitals/view-building/',id])
  }
}

