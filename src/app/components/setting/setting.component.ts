import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {
  constructor(){}
  active:boolean;
  icons=[
    {name:'اعدادات عامة',src:'assets/images/toolbar-icons/All-hosps.svg',link:'/dashboard/system/settings/general-setting'},
    {name:'انواع الغرف',src:'assets/images/toolbar-icons/All-hosps.svg',link:'/dashboard/system/settings/room-types'},
    {name:'انواع الهويات',src:'assets/images/toolbar-icons/Buildings-Card.svg',link:'/dashboard/system/settings/ssn-types'},
    {name:'انواع الزيارات',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/settings/visit-types'},
    {name:' فترات العمل',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/settings/working-period'},
    {name:'الجنسيات',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/settings/nationality'},
    {name:'الفئات السعرية',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/settings/price-category'},
    {name:'ايام الاسبوع',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/settings/work-week'},
    {name:'حالات التواجد',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/settings/doctor-status'},
    {name:'الدرجات العلمية',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/settings/doctor-degree'},
    {name:' الديانات',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/settings/religions'},
    {name:'الحالة الاجتماعية',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/settings/maritalStatus'},
    {name:' الجنس',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/settings/gender'},
    {name:' العملات',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/settings/currancy'},
    {name:' نوع الحجز',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/settings/bookingStatus'},




  ]

}
