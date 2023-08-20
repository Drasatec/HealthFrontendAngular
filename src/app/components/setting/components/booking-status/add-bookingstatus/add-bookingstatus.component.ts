import { Component, Inject, OnInit } from '@angular/core';
import { BookingStatusComponent } from '../booking-status.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../@theme/services/lookup.service';
import { AddReligionComponent } from '../../religions/add-religion/add-religion.component';
import { BookingStatusService } from '../../../services/booking-status.service';

@Component({
  selector: 'ngx-add-bookingstatus',
  templateUrl: './add-bookingstatus.component.html',
  styleUrls: ['./add-bookingstatus.component.scss']
})
export class AddBookingstatusComponent implements OnInit {

  form: FormGroup;
  loading=false
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _priceservice:BookingStatusService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddReligionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  id:number;
  building:any;
  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (param)=>{
    // console.log(param)

    //     this.id =param.id;
    //   }
    // )
    this.id=this.data? this.data.id :null
    this.createForm();
    if(this.id){
      this.getPriceCatById(this.id);
    }
  }
  priceCat
  getPriceCatById(id){
    let paylod={
      lang:'ar',
      id:id
    }
    this._priceservice.getBookingStatusById(paylod).subscribe(
      (res:any)=>{
        this.priceCat = res;
        this.patchForm();
      }
    )
  }
  patchForm(){
    this.form.patchValue({
      StatusName:this.priceCat.bookingStatusesTranslations.length > 0?this.priceCat.bookingStatusesTranslations[0].statusName:null,
  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      StatusName:[null,Validators.required],
    });
  }
  get formControls() {
    return this.form.controls;
  }
  translateData;
  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){
        this._priceservice.createBookingStatus(this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.snackBar.open("تم الاضافة  بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.closeDialog()
          },
          (err) => {
            this.loading=false
            this.snackBar.open("من فضلك حاول مرة اخري", "ُError", {
              duration: 3000,
              panelClass: 'error'
            });

          }
        )
      }else{
        this._priceservice.editBookingStatus(this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.snackBar.open("تم التعديل  بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.closeEditDialog()
          },
          (err) => {
            this.loading=false
            this.snackBar.open("من فضلك حاول مرة اخري", "ُError", {
              duration: 3000,
              panelClass: 'error'
            });

          }
        )
      }

    }
  }

  closeDialog() {
    this.dialogRef.close({isAdd:true});
  }
  closeEditDialog() {
    this.dialogRef.close({isAdd:true});
  }
  sendData;
  prepareDataBeforeSend(data){
    console.log(data)
    let paylod={
      id:this.id?this.id:null,
      ...data,
      BookingStatusesTranslations:[{
        id:this.id ? this.priceCat.bookingStatusesTranslations[0].id:0,
        StatusName:data.StatusName,
        LangCode:'ar',
      }],
    }
    this.sendData=this.formData(paylod)
  }
  formData(obj) {
    console.log(obj)

    let body = new FormData();
    let bodyObj = {}
    const formVal = obj;
    Object.keys(formVal).forEach((key) => {
      if (formVal[key]) {
        bodyObj[key] = formVal[key]
        if (key == "BookingStatusesTranslations") {
          for (let i = 0; i < formVal['BookingStatusesTranslations'].length; i++) {
            body.append('BookingStatusesTranslations['+(i)+'][id]', formVal.BookingStatusesTranslations[i].id );
            body.append('BookingStatusesTranslations['+(i)+'][StatusName]', formVal.BookingStatusesTranslations[i].StatusName);
            body.append('BookingStatusesTranslations['+(i)+'][LangCode]', formVal.BookingStatusesTranslations[i].LangCode);
          }
        }
        else if (key == "PhoneNumbers") {
          for (let i = 0; i < formVal['PhoneNumbers'].length; i++) {
            body.append('PhoneNumbers['+(i)+'][id]', formVal.PhoneNumbers[i].id);
            body.append('PhoneNumbers['+(i)+'][TelephoneNumber]', formVal.PhoneNumbers[i].TelephoneNumber);
          }
        }
        else {
          body.append(key, formVal[key]);
        }

      }
    });
    return body;
  }
  cancel(){
    this.form.reset()
  }

}
