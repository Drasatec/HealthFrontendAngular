import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent  {

  constructor(private router:Router) { }
  active:boolean;
  icons=[
    {name:'مستشفيات',src:'assets/images/toolbar-icons/All-hosps.svg',link:'/dashboard/system/hospitals'},
    {name:'مباني',src:'assets/images/toolbar-icons/Buildings-Card.svg',link:'/dashboard/system/buildings'},
    {name:'طوابق',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/floors'},
    {name:'غرف',src:'assets/images/toolbar-icons/All-rooms.svg',link:'/dashboard/system/rooms'},
    {name:'تخصصات',src:'assets/images/toolbar-icons/Specialization-Card.svg',link:'/dashboard/system/specialities'},
    {name:'عيادات',src:'assets/images/toolbar-icons/Clinics-Card.svg',link:'/dashboard/system/clinics'},
    {name:'الاطباء',src:'assets/images/toolbar-icons/Doctors.svg',link:'/dashboard/system/doctorss'},
    {name:'المرضي',src:'assets/images/toolbar-icons/Services-Card.svg',link:'/dashboard/system/patients'},

  ]
  // getLink(){
  //   for(let i=0;i<this.icons.length;i++){
  //     this.router.events.pipe(
  //       filter(event => event instanceof NavigationEnd)
  //     ).subscribe(res => {
  //       const route = this.router.url.replace(/[^\/]*$/, "")
  //       if (route === this.icons[i].link.replace(/[^\/]*$/, "")) {
  //         this.icons[i].active = true;
  //       }

  //       else {
  //         this.icons[i].active = false;
  //       }
  //     });
  //   }
  //   // console.log(this.icons)
  // }
  // ngAfterContentChecked (): void {
  //   this.getLink()


  // }
}
