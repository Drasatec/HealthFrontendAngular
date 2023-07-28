import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from '../../../../../@theme/services/lookup.service';
import { DoctorsService } from '../../../../system/components/doctorss/services/doctors.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from "moment";
import { BookingService } from '../../services/booking.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ngx-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss']
})
export class AddBookingComponent implements OnInit {

  form: FormGroup;
  ngModelDate = new Date();
  clinics
  id:number;
  isEdit:boolean;
  constructor(
    private _FormBuilder: FormBuilder,
    private route:ActivatedRoute,
    private lookupservice:LookupService,
    private _doctorsrvice:DoctorsService,
    public snackBar: MatSnackBar,
    private _bookingservice:BookingService,
    private dialog:MatDialog

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((para)=>{
      this.id=para.id
      console.log(this.id)
      if(this.id){
        this.isEdit=true;
        this.getBookingById(this.id)
      }
    })
    this.getHospitals()
    this.getPatients();
    this.getSpecialize();
    this.getDoctors();
    this.getVisitTypes()
    this.getpriceCategory()
    this.getCurrency()
    this.getDays()
    this.createForm();
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      HospitalId:[null,Validators.required],
      PatientId:[null,Validators.required],
      SpecialtyId:[null,Validators.required],
      DoctorId:[null,Validators.required],
      VisitingDate:[null,Validators.required],
      dayNumber:[null,Validators.required],
      WorkingPeriodId:[null,Validators.required],
      TypeVisitId:[null,Validators.required],
      PriceCategoryId:[null,Validators.required],
      CurrencyId:[null,Validators.required],
      Price:[null,Validators.required],
      ClinicId:[null]
    });
  }
  hospitals
  getHospitals(){
    this.lookupservice.getAllHospitalsNames().subscribe(
      (res)=>{
        this.hospitals=res
      }
    )
  }
  speciality
  getSpecialize(){
    this.lookupservice.getAllSpecialNames().subscribe(
      (res)=>{
        this.speciality=res
      }
    )
  }
  doctors
  getDoctors(e?){
    let payload;
    if(e){
      payload ={
        pageSize:30,
        specialtyId:e.medicalSpecialtyId
      }
      }else {
        payload={
          pageSize:30,
        }
      }
    this.lookupservice.getAllDoctors(payload).subscribe(
      (res)=>{
        this.doctors = res
      }
    )

  }
  patients
  getPatients(){
    let payload={
      pageSize:30
    }
    this.lookupservice.getAllPatients(payload).subscribe(
      (res)=>{
        this.patients = res
      }
    )
  }
  visitType
  getVisitTypes(){
    let payload={
      pageSize:30
    }
    this.lookupservice.getAllVisitTypesNames(payload).subscribe(
      (res)=>{
        this.visitType = res
      }
    )
  }
  days
  getDays(){
    this.lookupservice.getAllWorkWeek().subscribe(
      (res)=>{
        this.days = res
      }
    )
  }
  periodType
  getPeriodTypes(e){
    let payload={
      docId:this.form.value.DoctorId,
      day:e.dayNumber,
      lang:'ar'
    }
    this.getPeriod(payload)
  }
  getPeriod(payload){
    this._doctorsrvice.getDoctorPeriod(payload).subscribe(
      (res)=>{
        this.periodType = res
        if(this.periodType.length === 0){
          this.snackBar.open("لا توجد فترات لهذا الطبيب , من فضلك اختر يوم اخر ", "warning", {
            duration: 5000,
            panelClass: 'warning'
          });
        }
      }
    )
  }
  priceCategory
  getpriceCategory(){
    this.lookupservice.getAllPriceCategoryNames().subscribe(
      (res)=>{
        this.priceCategory=res
      }
    )
  }
  currency
  getCurrency(){
    let payload={
      lang:'ar'
    }
    this.lookupservice.getAllCurrency(payload).subscribe(
      (res)=>{
        this.currency=res
      }
    )
  }
  book
  getBookingById(id:number){
    let payload={
      id:id,
      lang:'ar'
    }
    this._bookingservice.getAllBookings(payload).subscribe(
      (res)=>{
        this.book = res.data[0];
        this.patch(this.book)
      }
    )
  }
  patch(data){
    let payload={
      docId:data.doctorId,
      day:data.dayNumber,
      lang:'ar'
    }
    this.getPeriod(payload)
    let date =data.visitingDate.split("T")[0].split("-")
    let visitdate= {
      day: date ? +date[2].split(" ")[0] : null,
      month: date ? +date[1] : null,
      year: date ? +date[0] : null,
    }
    this.form.patchValue({
      HospitalId:data.hospitalId,
      PatientId:data.patientId,
      SpecialtyId:data.specialtyId,
      DoctorId:data.doctorId,
      VisitingDate:visitdate,
      dayNumber:data.dayNumber,
      WorkingPeriodId:data.workingPeriodId,
      TypeVisitId:data.typeVisitId,
      PriceCategoryId:data.priceCategoryId,
      CurrencyId:data.currencyId,
      Price:data.price,
      ClinicId:data.clinicId,
    })
  }
  loading=false
  sendData;
  clinicId;
  clinicName;
  readonly DT_FORMAT = "YYYY-MM-DD";
  selectPeriod(e){
    console.log(e)
    this.clinicId=e.clinicId;
    this.clinicName=e.clinic
    this.form.patchValue({
      ClinicId:this.clinicId,
    })
  }
  prepareDataBeforeSend(data){
    console.log(data)
    let paylod={
      ...data,
      ClinicId:this.clinicId,
      VisitingDate:data.VisitingDate ? moment([
        data.VisitingDate.year,
        data.VisitingDate.month-1,
        data.VisitingDate.day,
      ]).format(this.DT_FORMAT): null,

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
          body.append(key, formVal[key]);

      }
    });
    return body;
  }
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  clinicInfo;
  findClinic(){

        let dialogRef = this.dialog.open(this.callAPIDialog,{
          width:'500px',

        });
        dialogRef.afterClosed().subscribe(result => {
            // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
            if (result !== undefined) {
                if (result === 'yes') {
                    // TODO: Replace the following line with your code.
                }
            }
        })


  }
  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){
        this._bookingservice.createBooking(this.sendData,this.form.value.ClinicId).subscribe(
          (res)=>{
            this.loading=false
            this.clinicInfo=res
            this.snackBar.open("تم اضافة الحجز بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.findClinic()
            this.form.reset()
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
        this._bookingservice.editBooking(this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.snackBar.open("تم تعديل الحجز بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
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
}
