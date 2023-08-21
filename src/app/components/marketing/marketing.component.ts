import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent {

  constructor(private router:Router) { }
  active:boolean;
  icons=[
    {name:'رسائل العملاء',src:'assets/images/toolbar-icons/All-hosps.svg',link:'/dashboard/marketing/contactUs'},
    {name:'الاعلانات',src:'assets/images/toolbar-icons/Buildings-Card.svg',link:'/dashboard/marketing/promotions'},
    
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
