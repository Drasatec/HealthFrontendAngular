import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorIntl, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MyCustomPaginatorIntl } from '../../../../../../pages/paginator/paginator.srvice';
import { environment } from '../../../../../../../environments/environment';
import { BuildingModel } from '../../models/building.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AddInfoTranslateComponent } from '../../../hospitals/components/add-info-translate/add-info-translate.component';
import { HospitalService } from '../../../hospitals/services/hospital.service';
import { BuildingService } from '../../services/building.service';
import { AddBuildTranslateComponent } from '../add-build-translate/add-build-translate.component';
import { AddBuildingComponent } from '../add-building/add-building.component';
 export class UserData{
  id:string;
  name:string;
  address:string;
  other:string;
  img:string;
 }
@Component({
  selector: 'ngx-all-buildings',
  templateUrl: './all-buildings.component.html',
  styleUrls: ['./all-buildings.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],

})
export class AllBuildingsComponent implements OnInit {
  imgUrl=`${environment.imgUrl}`;
  displayedColumns: string[] = ['id','name','hospital','status','img','action'];
  dataSource: MatTableDataSource<BuildingModel>;
  private subscriptions: Subscription = new Subscription();
  totalItems: number ;
  pageSize: number = 10;
  pageIndex: number = 0;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  filterElements = {
    global_search: true,
    status:true,
    hospitals:true
  };
  loading=true;
  constructor(private router:Router,private _buildingservice:BuildingService,
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
  buildings:any;
  getTableData(status){
    let para
      para={
        lang:'ar',
        status:status,
        page:this.pageIndex+1,
        pageSize:this.pageSize
      }

    this.subscriptions.add(
      this._buildingservice.getAllBuildingss(para).subscribe((res: any) => {

      this.buildings = res.buildings;
      this.dataSource = new MatTableDataSource(this.buildings);
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

      this._buildingservice.activeBuildings(id,action).subscribe(
        (res: any) => {
          if(action === 'active'){
            this.snackBar.open("تم تشغيل المبني بنجاح ", "ُsuccess", {
              duration: 3000,
              panelClass: 'success'
            });
          }else{
            this.snackBar.open("تم ايقاف المبني بنجاح ", "ُsuccess", {
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
      this.router.navigate(['/dashboard/system/buildings/edit-building',id])
    }else if(action === 'translate'){
      this.openTranslateDialog(id);
    }
  }
  translateData;
  openTranslateDialog(id){
    const dialogRef = this.dialog.open(AddBuildTranslateComponent,{
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
    this.router.navigate(['/dashboard/system/buildings/view-building/',id])
  }
  searchBuilding(pay){
    this._buildingservice.SearchBuildings(pay).subscribe(
      (res)=>{
        this.buildings = res.buildings;
        console.log(this.buildings)
      this.dataSource = new MatTableDataSource(this.buildings);
      this.dataSource.paginator = this.paginator;
      this.totalItems = res.total;
      this.loading=false;
      }
    )
  }
  openAddBuilding(){
    const dialogRef = this.dialog.open(AddBuildingComponent,{
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
  onFilterChange(e) {
    console.log(e.target)
    this.status = e.status;

    if(e.status && !e.name || e.hosId){
      let payload={
        status:e.status ?e.status :this.status,
        hosId : e.hosId ?e.hosId : null
      }
      this.getTableData(payload)
    }
    else if(e.name && !e.status){
      let pay={
        searchTerm:e.name,
        lang:'ar'
      }
      this.searchBuilding(pay)
    }
    else{
    this.status='active';
      this.getTableData(this.status)
    }
  }

}

