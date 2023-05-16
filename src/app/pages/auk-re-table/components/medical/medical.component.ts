import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-medical-auk',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss']
})
export class MedicalComponent {
  @Input() column: any;
  @Input() row: any;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onChange: EventEmitter<any> = new EventEmitter();


  constructor() { }


  showMedicalIssue() {
    this.onChange.emit({ key: 'show-medical-issue' })
  }


}
