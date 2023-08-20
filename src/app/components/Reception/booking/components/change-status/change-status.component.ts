import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LookupService } from '../../../../../@theme/services/lookup.service';
import { BookingService } from '../../services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ngx-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements OnInit {
  status=[];
  constructor(
    private lookupservice:LookupService,
    private bookservice:BookingService,
    public snackBar: MatSnackBar,

    public dialogRef: MatDialogRef<ChangeStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.getStatus()
  }
  getStatus(){
    let payload={
      pageSize:30
    }
    this.lookupservice.getAllBookingStatus(payload).subscribe(
      (res)=>{
        this.status = res
      }
    )

  }
  statusId;
  filters(event){
    this.statusId=event.bookingStatusId
    console.log(event)
  }
  save(){
    console.log(this.statusId,this.data.id)
    this.bookservice.editStatusBooking(this.data.id,this.statusId).subscribe(
      (res)=>{
        this.snackBar.open("تم تعديل حالة الحجز بنجاح ", "ُsuccess", {
          duration: 5000,
          panelClass: 'success'
        });
      },(error)=>{
        this.snackBar.open("حاول مرة اخري ", "ُsuccess", {
          duration: 5000,
          panelClass: 'error'
        });
      }
    )
  }
  closeEditDialog() {
    this.dialogRef.close({isAdd:true});
  }
}
