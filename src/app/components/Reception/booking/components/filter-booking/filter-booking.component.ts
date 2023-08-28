import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelperService } from '../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../@theme/services/lookup.service';
import * as moment from 'moment';

@Component({
  selector: 'ngx-filter-booking',
  templateUrl: './filter-booking.component.html',
  styleUrls: ['./filter-booking.component.scss']
})
export class FilterBookingComponent implements OnInit {
  @Output() FilterChange: EventEmitter<any> = new EventEmitter();
  @Output() eventYearBreakdown: EventEmitter<any> = new EventEmitter();
  @Output() eventCourseWorkName: EventEmitter<any> = new EventEmitter();
  @Output() toDisplayNoData: EventEmitter<any> = new EventEmitter();

  @Input() filterElements;
  @Input() teacherData;
  @Input() clearButton = true;
  @Output() AddElement: EventEmitter<any> = new EventEmitter();
  readonly DT_FORMAT = "DD-MM-YYYY";
  readonly DT_FORMAT_Two = "YYYY-MM-DD";
  minDate;
  maxDate;
  form: FormGroup;
  lookups = {
    clinics:[],
    status:[],
    visitType:[],
    hospitals:[],
    buildings:[],
    floors:[],
    specialize:[],
    doctors:[]
  };

  subscriptions: Subscription = new Subscription();

  constructor(
    private _FormBuilder: FormBuilder,
    private _MatDialog: MatDialog,
    private helpers: HelperService,
    private route: ActivatedRoute,
    private router: Router,
    private lookupservice:LookupService
  ) { }
  ngOnInit(): void {
    this.initilazeForm();
    this.getAllLookups();
  }
  today = {
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };
  monthRange={
    day: new Date().getDate(),
    month: new Date().getMonth()-1,
    year: new Date().getFullYear(),
  };
  initilazeForm() {
    this.form = this._FormBuilder.group({
      name: [null],
      clinicId:[null],
      visitTypeId:[],
      bookStatusId:[],
      hospitalId:[null],
      buildId:[null],
      floorId:[null],
      roomId:[null],
      specialtyId:[null],
      doctorId:[null],
      StartDateTime:[null],
      EndDateTime:[null],
    });
  }
  get formControls() {
    return this.form.controls;
  }
  prepareDataBeforeEmit(data: any) {
    let payload = {
      ...data,
      StartDateTime:data.StartDateTime?moment(data.StartDateTime).format(this.DT_FORMAT_Two):null,
      EndDateTime:data.EndDateTime?moment(data.EndDateTime).format(this.DT_FORMAT_Two):null
    };
    return this.helpers.deleteNullValuesFetchCriteria(payload);
  }


  filters(value?: any) {
    if(this.form.value.StartDateTime){
      this.minDate = this.form.value.StartDateTime
    }
    if(this.form.value.EndDateTime){
      this.maxDate = this.form.value.EndDateTime
    }
    let formData = this.prepareDataBeforeEmit(this.form.value);
    this.FilterChange.emit(formData);
    this.toDisplayNoData.emit(true)

  }
  DisplayNoData(e){
    console.log(e)
  }
  clearSearch() {
    this.form.reset();
    this.form.markAllAsTouched();
    this.filters();
  }

  getAllLookups() {
    this.getvisitType();
    this.getStatus();
    this.getHospitals();
    this.getSpecialize();
    this.getDoctors();

  }

  getClinics(payload){
    this.lookupservice.getAllClinicsNames(payload).subscribe(
      (res)=>{
        this.lookups.clinics = res
      }
    )

  }
  getStatus(){
    let payload={
      pageSize:30
    }
    this.lookupservice.getAllBookingStatus(payload).subscribe(
      (res)=>{
        this.lookups.status = res
      }
    )

  }
  getvisitType(){
    let payload={
      pageSize:30
    }
    this.lookupservice.getAllVisitTypesNames(payload).subscribe(
      (res)=>{
        this.lookups.visitType = res
      }
    )

  }
  getHospitals(){
    let payload={
      pageSize:30
    }
    this.lookupservice.getAllHospitalsNames(payload).subscribe(
      (res)=>{
        this.lookups.hospitals = res
      }
    )

  }
  chooseBuilding(e){
    console.log(e)
    let payload={
      hosId:e.hospitalId,
      pageSize:30
    }
    this.getClinics(payload)

  }
  clearHos(){
    console.log("cleeean")
    this.form.reset()
    this.lookups.clinics=[];

  }

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
        this.lookups.doctors = res
      }
    )
  }
  getSpecialize(){
    this.lookupservice.getAllSpecialNames().subscribe(
      (res)=>{
        this.lookups.specialize=res
      }
    )
  }
}



