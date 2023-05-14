import { Component, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'row-title',
  templateUrl: './row-title.component.html',
  styleUrls: ['./row-title.component.scss']
})
export class RowTitleComponent {

  @Input() value :any;

  constructor() { }


}
