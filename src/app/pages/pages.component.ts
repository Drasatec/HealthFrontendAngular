import { Component } from '@angular/core';

import { items } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
  kk
    <ngx-one-column-layout>
      <!-- <nb-menu [items]="menu" autoCollapse="true">
      </nb-menu> -->
      <ngx-sidebar [items]=menu></ngx-sidebar>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = items;
  constructor(){console.log("lllll")}
}
