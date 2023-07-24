import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from '../../../../../@theme/services/lookup.service';
import { DoctorsService } from '../../../../system/components/doctorss/services/doctors.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from "moment";
import { BookingService } from '../../services/booking.service';

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
    private _bookingservice:BookingService

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
    this.lookupservice.getAllCurrency().subscribe(
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
        this.book = res;
        this.form.patchValue(this.book)
      }
    )
  }
  loading=false
  sendData;
  readonly DT_FORMAT = "YYYY-MM-DD";

  prepareDataBeforeSend(data){
    console.log(data)
    let paylod={
      ...data,
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
  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){
        this._bookingservice.createBooking(this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.snackBar.open("تم اضافة الحجز بنجاح ", "ُsuccess", {
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
