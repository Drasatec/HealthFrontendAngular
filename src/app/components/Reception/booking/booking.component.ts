import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  constructor() { }

  active:boolean;
  icons=[
    {name:' الحجوزات',src:'assets/images/toolbar-icons/All-hosps.svg',link:'/dashboard/booking/all-booking'},
    {name:' الحجوزات الاونلاين',src:'assets/images/toolbar-icons/Buildings-Card.svg',link:'/dashboard/system/settings/ssn-types'},
    {name:' اضافة حجز',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/booking/add-booking'},
    {name:'  الحجوزات المقبولة',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/settings/working-period'},
    {name:'الحجوزات المرفوضة',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/settings/nationality'},


  ]

}
