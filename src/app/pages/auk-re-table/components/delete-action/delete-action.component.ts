/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-action',
  templateUrl: './delete-action.component.html',
  styleUrls: ['./delete-action.component.scss']
})
export class DeleteActionComponent {

  @Input() row: any;
  @Input() column: any;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onChange: EventEmitter<any> = new EventEmitter();


  constructor() { }



  deleteActions() {
    this.onChange.emit({ key: 'delete' })
  }

}
