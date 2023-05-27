import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss']
})
export class AddBookingComponent implements OnInit {

  form: FormGroup;
  ngModelDate = new Date();
  clinics=[
    {id:0,name:' القلب'},
    {id:1,name:'  باطن'},
    {id:2,name:'  انف و اذن'},
    {id:2,name:'  اطفال'},

  ]
  id:number;
  isEdit:boolean;
  constructor(
    private _FormBuilder: FormBuilder,
    private route:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((para)=>{
      this.id=para.id
      console.log(this.id)
      if(this.id){
        this.isEdit=true
      }
    })
    this.createForm();
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      patient: [null],
      doctor: [null,Validators.required],
      clinic: [null],
      date:[],
    });
  }
  save(){}
}
