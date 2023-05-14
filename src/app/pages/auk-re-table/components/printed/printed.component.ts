import { Component, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-printed',
  templateUrl: './printed.component.html',
  styleUrls: ['./printed.component.scss']
})
export class PrintedComponent  {

  @Input() row:any;
  @Input() column:any;
  constructor() { }



}
