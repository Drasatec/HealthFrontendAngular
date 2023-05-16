import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'attendance-actions',
  templateUrl: './attendance-actions.component.html',
  styleUrls: ['./attendance-actions.component.scss']
})
export class AttendanceActionsComponent {

  @Input() row:any;
  @Input() actions:any;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClick: EventEmitter<any> = new EventEmitter(null);

  constructor() { }



}
