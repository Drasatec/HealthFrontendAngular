import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { BuildingModel } from '../../../system/components/buildings/models/building.model';
import { TypesService } from '../../services/types.service';
import { AddRoomtypesComponent } from '../room-types/add-roomtypes/add-roomtypes.component';
import { TranslationTypesComponent } from '../translation-types/translation-types.component';
import { AddVisittypesComponent } from './add-visittypes/add-visittypes.component';
import { VisitTypesService } from '../../services/visit-types.service';

@Component({
  selector: 'ngx-visit-types',
  templateUrl: './visit-types.component.html',
  styleUrls: ['./visit-types.component.scss']
})
export class VisitTypesComponent implements OnInit {
  displayedColumns: string[] = ['id','name','action'];
  dataSource: MatTableDataSource<BuildingModel>;
  private subscriptions: Subscription = new Subscription();
  totalItems: number ;
  pageSize: number = 10;
  pageIndex: number = 0;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  filterElements = {
    global_search: true,
  };
  loading=true;
  constructor(private router:Router,
    private _roomtypeservice:VisitTypesService,
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

  }
  pageChanged(event: PageEvent) {
    console.log(event)
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getTableData(this.fetch);
  }
  visitTypes:any;
  getTableData(payload?){
    let para
      para={
        lang:'ar',
        ...payload,
        page:this.pageIndex+1,
        pageSize:this.pageSize
      }

    this.subscriptions.add(
      this._roomtypeservice.getvisitTypes(para).subscribe((res: any) => {

      this.visitTypes = res.data;
      this.dataSource = new MatTableDataSource(this.visitTypes);
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
    if(action === 'delete'){
      console.log("act")
      Swal.fire({
        title: "هل انت متأكد من حذف نوع الزيارة ؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "الغاء",
      }).then((result) => {
        if (result.isConfirmed === true) {
          this._roomtypeservice.deletevisitTypes(id).subscribe(
            (res: any) => {
              if(action === 'active'){
                this.snackBar.open("تم الحذف بنجاح ", "ُsuccess", {
                  duration: 3000,
                  panelClass: 'success'
                });
              }

              this.getTableData(this.fetch);
            },
            (err) => {
              this.snackBar.open("هذا النوع مرتبط  او له ترجمات", "ُError", {
                duration: 3000,
                panelClass: 'error'
              });

            }
          )
        }

        // Remove Deleted Academic From List & Update the Service Academic Years
      });

    }else if (action === 'edit'){
      console.log("edit")
      this.openEditDialog(id)
    }else if(action === 'translate'){
      this.openTranslateDialog(id);
    }
  }
  translateData;
  openEditDialog(id){
    const dialogRef = this.dialog.open(AddVisittypesComponent,{
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
  openTranslateDialog(id){
    const dialogRef = this.dialog.open(TranslationTypesComponent,{
      width: "1200px",
      disableClose: true,
      data:{
        id:id,
        type:'visitType'

      }
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
        this.getTableData(this.fetch)
      }
    });
  }

  searchRoomTypes(pay){
    this._roomtypeservice.SearchvisitTypes(pay).subscribe(
      (res)=>{
        this.visitTypes = res;
        // console.log(this.buildings)
      this.dataSource = new MatTableDataSource(this.visitTypes);
      this.dataSource.paginator = this.paginator;
      this.totalItems = res.total;
      this.loading=false;
      }
    )
  }
  openAddRoomTypes(){
    const dialogRef = this.dialog.open(AddVisittypesComponent,{
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
        hosId : e.hosId ? e.hosId : null
      }
      console.log(payload)
      this.getTableData(payload)
    }
    else if(e.name && !e.status){
      let pay={
        searchTerm:e.name,
        lang:'ar'
      }
      this.searchRoomTypes(pay)
    }
    else{
    this.fetch={
      status:'active'
    }
      this.getTableData(this.fetch)
    }
  }

}

