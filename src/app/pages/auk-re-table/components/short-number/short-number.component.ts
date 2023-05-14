import { Component, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'short-number',
  templateUrl: './short-number.component.html',
  styleUrls: ['./short-number.component.scss']
})
export class ShortNumberComponent  {

  @Input() value :any;


  constructor() { }


}
