import { Component, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table-human-card',
  templateUrl: './table-human-card.component.html',
  styleUrls: ['./table-human-card.component.scss']
})
export class TableHumanCardComponent {

  @Input() column:any;
  @Input() row:any;

  constructor() { }


}
