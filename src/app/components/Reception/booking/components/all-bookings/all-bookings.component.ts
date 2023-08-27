import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MyCustomPaginatorIntl } from '../../../../../pages/paginator/paginator.srvice';
import { BookingService } from '../../services/booking.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { AddBuildTranslateComponent } from '../../../../system/components/buildings/components/add-build-translate/add-build-translate.component';
import { AddBuildingComponent } from '../../../../system/components/buildings/components/add-building/add-building.component';
import { BuildingModel } from '../../../../system/components/buildings/models/building.model';
import { BuildingService } from '../../../../system/components/buildings/services/building.service';
import Swal from 'sweetalert2';
import { ChangeStatusComponent } from '../change-status/change-status.component';
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
export class AllBookingsComponent implements OnInit {
  imgUrl=`${environment.imgUrl}`;
  displayedColumns: string[] = ["name","hospital","period","doctor","clinic","date","visit","status","action"];
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
    hospitals:true,
    clinics:true,
    doctors:true,
    specialtyId:true,
    dateRange:true
  };
  loading=true;
  constructor(private router:Router,private _bookingservice:BookingService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) {

  }
  fetch={
    lang:'ar'
  }
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
  bookings:any;
  getTableData(payload?){
    let para
      para={
        lang:'ar',
        ...payload,
        page:this.pageIndex+1,
        pageSize:this.pageSize
      }

    this.subscriptions.add(
      this._bookingservice.getAllBookings(para).subscribe((res: any) => {

      this.bookings = res.data;
      this.dataSource = new MatTableDataSource(this.bookings);
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
    if (action === 'edit'){
      console.log("edit")
      this.openEditDialog(id)
    }else if(action === 'delete'){
      this.openTranslateDialog(id);
    }else if(action === 'status'){
      this.openStatusDialog(id);
    }
  }
  translateData;
  openEditDialog(id){
    this.router.navigate(['/booking/edit-booking',id])
  }
  openTranslateDialog(id){
    Swal.fire({
      title: "هل انت متأكد من حذف الحجز ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.isConfirmed === true) {
        this._bookingservice.deleteBooking(id).subscribe(
          (res: any) => {
              this.snackBar.open("تم الحذف بنجاح ", "ُsuccess", {
                duration: 3000,
                panelClass: 'success'
              });

            this.getTableData(this.fetch);
          },
          (err) => {
            this.snackBar.open("لا يمكن الحذف", "ُError", {
              duration: 3000,
              panelClass: 'error'
            });

          }
        )
      }

      // Remove Deleted Academic From List & Update the Service Academic Years
    });
  }
  openStatusDialog(id){
      const dialogRef = this.dialog.open(ChangeStatusComponent,{
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
  onClickPublisher(id){
    console.log(id)
    this.router.navigate(['/booking/view-booking/',id])
  }
  openAddBuilding(){
    this.router.navigate(['/booking/add-booking'])

  }
  onFilterChange(e) {
    console.log(e)
    this.getTableData(e)
  }

}

