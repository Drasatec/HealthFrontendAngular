import { Component, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'feature-image',
  templateUrl: './feature-image.component.html',
  styleUrls: ['./feature-image.component.scss']
})
export class FeatureImageComponent  {
  @Input() row:any;

  constructor() { }



}
