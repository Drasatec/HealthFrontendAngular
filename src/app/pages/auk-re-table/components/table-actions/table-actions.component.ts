import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableActions, TableActionsTypes } from '../../models/table-actions/table-actions';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent  {

  @Input() row:any;
  @Input() actions:any[] = [];
  @Input() actionsData:any;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onAction: EventEmitter<any> = new EventEmitter(null);


  constructor() { }



}


