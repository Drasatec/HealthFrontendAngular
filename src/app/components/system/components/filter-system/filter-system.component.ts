import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from "moment";
import { HelperService } from '../../../../@theme/services/helper.service';

@Component({
  selector: 'ngx-filter',
  templateUrl: './filter-system.component.html',
  styleUrls: ['./filter-system.component.scss']
})
export class FilterSystemComponent implements OnInit{
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

  form: FormGroup;
  lookups = {
    hospitals:[],
    specialize:[]
  };

  subscriptions: Subscription = new Subscription();

  constructor(
    private _FormBuilder: FormBuilder,
    private _MatDialog: MatDialog,
    private helpers: HelperService,
    private route: ActivatedRoute,
    private router: Router,
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
      keyword: [null],
      hospital:[null],
      specialize:[null]
    });
  }
  get formControls() {
    return this.form.controls;
  }
  prepareDataBeforeEmit(data: any) {
    let payload = {
      ...data,
    };
    return this.helpers.deleteNullValuesFetchCriteria(payload);
  }


  filters(value?: any) {

    let formData = this.prepareDataBeforeEmit(this.form.value);
    this.FilterChange.emit(formData);
    this.toDisplayNoData.emit(true)

  }

  clearSearch() {
    this.form.reset();
    this.form.markAllAsTouched();

  }

  getAllLookups() {
    this.getHospitals();
    this.getSpecialize();
  }
  getHospitals(){
    let hospitals = [
      {id:1,name:'مستشفي الرحمة'},
      {id:2,name:'مستشفي الخير'},
      {id:3,name:'مستشفي الاندلس'},
      {id:4,name:'مستشفي الجمل'},

    ]
    this.lookups.hospitals = hospitals
  }
  getSpecialize(){
    let specialize = [
      {id:1,name:' باطن'},
      {id:2,name:' قلب'},
      {id:3,name:' انف و اذن'},
      {id:4,name:' اطفال'},

    ]
    this.lookups.specialize = specialize
  }
}
