import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements AfterContentChecked {

  constructor(private router:Router) { }
  active:boolean;
  icons=[
    {name:'مستشفيات',src:'assets/images/toolbar-icons/All-hosps.svg',link:'/dashboard/system/hospitals/all-hospital',active:false},
    {name:'مباني',src:'assets/images/toolbar-icons/Buildings-Card.svg',link:'/dashboard/system/buildings/all-building',active:false},
    {name:'طوابق',src:'assets/images/toolbar-icons/Floor-Card.svg',link:'/dashboard/system/booking/all-booking',active:false},
    {name:'غرف',src:'assets/images/toolbar-icons/All-rooms.svg',link:'/dashboard/system/booking/all-booking',active:false},
    {name:'عيادات',src:'assets/images/toolbar-icons/Clinics-Card.svg',link:'/dashboard/system/booking/all-booking',active:false},
    {name:'دكاترة',src:'assets/images/toolbar-icons/Doctors.svg',link:'/dashboard/system/doctors/all-doctor',active:false},
    {name:'تخصصات',src:'assets/images/toolbar-icons/Specialization-Card.svg',link:'/dashboard/system/booking/all-booking',active:false},
    {name:'خدمات',src:'assets/images/toolbar-icons/Services-Card.svg',link:'/dashboard/system/booking/all-booking',active:false},

  ]
  getLink(){
    for(let i=0;i<this.icons.length;i++){
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(res => {
        const route = this.router.url.replace(/[^\/]*$/, "")
        if (route === this.icons[i].link.replace(/[^\/]*$/, "")) {
          this.icons[i].active = true;
        }

        else {
          this.icons[i].active = false;
        }
      });
    }
    // console.log(this.icons)
  }
  ngAfterContentChecked (): void {
    this.getLink()


  }
}
