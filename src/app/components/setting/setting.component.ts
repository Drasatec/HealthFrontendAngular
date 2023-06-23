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
    {name:'انواع الغرف',src:'assets/images/toolbar-icons/All-hosps.svg',link:'/dashboard/settings/room-types'},
    {name:'انواع الهويات',src:'assets/images/toolbar-icons/Buildings-Card.svg',link:'/dashboard/settings/ssn-types'},
    {name:'انواع الزيارات',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/settings/visit-types'},
    {name:' فترات العمل',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/settings/working-period'},
    {name:'الجنسيات',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/settings/nationality'},
    {name:'الفئات السعرية',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/settings/price-category'},


  ]

}
