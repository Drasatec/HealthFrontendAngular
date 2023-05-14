import { Component, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-table-label-title',
  templateUrl: './table-label-title.component.html',
  styleUrls: ['./table-label-title.component.scss']
})
export class TableLabelTitleComponent {
  @Input() row:any;
  @Input() value:any;
  constructor() { }



}
