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
    {name:'اعدادات عامة',src:'assets/images/toolbar-icons/All-hosps.svg',link:'/system/settings/general-setting'},
    {name:'اللغات',src:'assets/images/toolbar-icons/All-hosps.svg',link:'/system/settings/languages'},
    {name:'انواع الغرف',src:'assets/images/toolbar-icons/All-hosps.svg',link:'/system/settings/room-types'},
    {name:'انواع الهويات',src:'assets/images/toolbar-icons/Buildings-Card.svg',link:'/system/settings/ssn-types'},
    {name:'انواع الزيارات',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/system/settings/visit-types'},
    {name:' فترات العمل',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/system/settings/working-period'},
    {name:'الجنسيات',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/system/settings/nationality'},
    {name:'الفئات السعرية',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/system/settings/price-category'},
    {name:'ايام الاسبوع',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/system/settings/work-week'},
    {name:'حالات التواجد',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/system/settings/doctor-status'},
    {name:'الدرجات العلمية',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/system/settings/doctor-degree'},
    {name:' الديانات',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/system/settings/religions'},
    {name:'الحالة الاجتماعية',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/system/settings/maritalStatus'},
    {name:' الجنس',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/system/settings/gender'},
    {name:' العملات',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/system/settings/currancy'},
    {name:' نوع الحجز',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/system/settings/bookingStatus'},




  ]

}
