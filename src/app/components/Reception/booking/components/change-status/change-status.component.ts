import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LookupService } from '../../../../../@theme/services/lookup.service';
import { BookingService } from '../../services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements OnInit {
  status=[];
  form=new FormGroup({
    statusReason:new FormControl(''),
    statusId:new FormControl(''),

  })
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
   if(event.bookingStatusId !== 3) {
    this.form.controls.statusReason.disable()
   }else{
    this.form.controls.statusReason.enable()
   }
    console.log(event)
  }
  save(){
    this.bookservice.editStatusBooking(this.data.id,this.form.value.statusId,this.form.value.statusReason).subscribe(
      (res)=>{
        this.snackBar.open("تم تعديل حالة الحجز بنجاح ", "ُsuccess", {
          duration: 5000,
          panelClass: 'success'
        });
        this.closeEditDialog()
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
