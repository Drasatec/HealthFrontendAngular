import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-custody-auk',
  templateUrl: './custody.component.html',
  styleUrls: ['./custody.component.scss']
})
export class CustodyComponent {

  @Input() row: any;
  @Input() column: any;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onChange: EventEmitter<any> = new EventEmitter();


  constructor() { }

  showCustody() {
    this.onChange.emit({ key: 'show-custody' })
  }

}
