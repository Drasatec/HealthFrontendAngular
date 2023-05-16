import { Component, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table-tag',
  templateUrl: './table-tag.component.html',
  styleUrls: ['./table-tag.component.scss']
})
export class TableTagComponent {

  @Input() row:any;
  @Input() column:any;

  constructor() { }



}
