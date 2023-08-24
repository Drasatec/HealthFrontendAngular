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
    {name:'الفروع',src:'assets/images/toolbar-icons/All-hosps.svg',link:'/system/hospitals'},
    {name:'مباني',src:'assets/images/toolbar-icons/Buildings-Card.svg',link:'/system/buildings'},
    {name:'طوابق',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/system/floors'},
    {name:'غرف',src:'assets/images/toolbar-icons/All-rooms.svg',link:'/system/rooms'},
    {name:'تخصصات',src:'assets/images/toolbar-icons/Specialization-Card.svg',link:'/system/specialities'},
    {name:'عيادات',src:'assets/images/toolbar-icons/Clinics-Card.svg',link:'/system/clinics'},
    {name:'الاطباء',src:'assets/images/toolbar-icons/Doctors.svg',link:'/system/doctorss'},
    {name:'المرضي',src:'assets/images/toolbar-icons/Services-Card.svg',link:'/system/patients'},

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
