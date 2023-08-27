import { Component, OnInit, ViewChild } from '@angular/core';
import { SpecialService } from '../../services/special.service';
import { AddSpecialComponent } from '../add-special/add-special.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { MyCustomPaginatorIntl } from '../../../../../../pages/paginator/paginator.srvice';
import { AddBuildTranslateComponent } from '../../../buildings/components/add-build-translate/add-build-translate.component';
import { FloorModel } from '../../../floors/models/floors.model';

@Component({
  selector: 'ngx-all-specials',
  templateUrl: './all-specials.component.html',
  styleUrls: ['./all-specials.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],

})
export class AllSpecialsComponent implements OnInit {
  imgUrl=`${environment.imgUrl}`;
  displayedColumns: string[] = ['id','name','appear','status','img','action'];
  dataSource: MatTableDataSource<FloorModel>;
  private subscriptions: Subscription = new Subscription();
  totalItems: number ;
  pageSize: number = 10;
  pageIndex: number = 0;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  filterElements = {
    global_search: true,
    status:true,
  };
  loading=true;
  constructor(private router:Router,private _specialservice:SpecialService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) {

  }
  fetch={
    status:'active'
  }
  status:string='active';
  timestamp = new Date().getTime();

  ngOnInit() {
    this.getTableData(this.fetch)
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // console.log(this.length,this.pageIndex,this.pageSize)
  }
  pageChanged(event: PageEvent) {
    console.log(event)
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getTableData(this.fetch);
  }
  specials:any;
  getTableData(fetch){
    let para
      para={
        lang:'ar',
        ...fetch,
        page:this.pageIndex+1,
        pageSize:this.pageSize
      }

    this.subscriptions.add(
      this._specialservice.getAllMedicalSpecials(para).subscribe((res: any) => {

      this.specials = res.data;
      this.dataSource = new MatTableDataSource(this.specials);
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
    if(action === 'active' || action ==='inactive'){
      console.log("act")

      this._specialservice.activeMedicalSpecialty(id,action).subscribe(
        (res: any) => {
          if(action === 'active'){
            this.snackBar.open("تم تشغيل التخصص بنجاح ", "ُsuccess", {
              duration: 3000,
              panelClass: 'success'
            });
          }else{
            this.snackBar.open("تم ايقاف التخصص بنجاح ", "ُsuccess", {
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
    }
  }
  openEditDialog(id){
    const dialogRef = this.dialog.open(AddSpecialComponent,{
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
    const dialogRef = this.dialog.open(AddBuildTranslateComponent,{
      width: "1200px",
      disableClose: true,
      data:{
        id:id,
        type:'special'
      }
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
    this.router.navigate(['/system/specialities/view-special/',id])
  }
  searchHospital(pay){
    this._specialservice.SearchMedicalSpecial(pay).subscribe(
      (res)=>{
        this.specials = res.data;
        // console.log(this.rooms)
      this.dataSource = new MatTableDataSource(this.specials);
      this.dataSource.paginator = this.paginator;
      this.totalItems = res.total;
      this.loading=false;
      }
    )
  }
  onFilterChange(e) {
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
      this.getTableData(this.fetch)
    }
  }
  openAddSpecial(){
    const dialogRef = this.dialog.open(AddSpecialComponent,{
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
}

