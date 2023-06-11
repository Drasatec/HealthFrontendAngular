import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { AddInfoTranslateComponent } from '../../../hospitals/components/add-info-translate/add-info-translate.component';
import { FloorModel } from '../../models/floors.model';
import { FloorService } from '../../services/floor.service';

@Component({
  selector: 'ngx-all-floors',
  templateUrl: './all-floors.component.html',
  styleUrls: ['./all-floors.component.scss']
})
export class AllFloorsComponent implements OnInit {
  imgUrl=`${environment.imgUrl}`;
  displayedColumns: string[] = ['id','name','hospital','building','status','img','action'];
  dataSource: MatTableDataSource<FloorModel>;
  private subscriptions: Subscription = new Subscription();
  totalItems: number ;
  pageSize: number = 10;
  pageIndex: number = 0;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  filterElements = {
    global_search: true,
    status:true
  };
  loading=true;
  constructor(private router:Router,private _floorservice:FloorService,
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
      this._floorservice.getAllHospitals(para).subscribe((res: any) => {

      this.hospitals = res.hospitals;
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
    if(action === 'active' || action ==='inactive'){
      console.log("act")

      this._floorservice.activeHospital(id,action).subscribe(
        (res: any) => {
          if(action === 'active'){
            this.snackBar.open("تم تشغيل الطابق بنجاح ", "ُsuccess", {
              duration: 3000,
              panelClass: 'success'
            });
          }else{
            this.snackBar.open("تم ايقاف الطابق بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
          }

          this.getTableData(this.status);
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
      this.router.navigate(['/dashboard/system/floors/edit-floor',id])
    }else if(action === 'translate'){
      this.openTranslateDialog(id);
    }
  }
  translateData;
  openTranslateDialog(id){
    const dialogRef = this.dialog.open(AddInfoTranslateComponent,{
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
  onClickPublisher(id){
    console.log(id)
    this.router.navigate(['/dashboard/system/floors/view-floor/',id])
  }
  searchHospital(pay){
    this._floorservice.SearchHospital(pay).subscribe(
      (res)=>{
        this.hospitals = res.hospitals;
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

