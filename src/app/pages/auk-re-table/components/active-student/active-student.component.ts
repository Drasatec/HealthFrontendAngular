/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-active-student',
  templateUrl: './active-student.component.html',
  styleUrls: ['./active-student.component.scss']
})
export class ActiveStudentComponent  {
  @Input() row: any;
  @Input() column: any;
  constructor() { }



}
