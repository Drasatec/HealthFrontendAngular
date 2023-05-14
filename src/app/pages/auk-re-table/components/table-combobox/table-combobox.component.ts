import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table-combobox',
  templateUrl: './table-combobox.component.html',
  styleUrls: ['./table-combobox.component.scss']
})
export class TableComboboxComponent {

  @Output() valueChanges:EventEmitter<any> = new EventEmitter();
  propertyName;
  @Input() set property(val) {
    if (val) {
      this.propertyName = val
      this.setSelectedVale();

    }
  };

  // compoBox
  rowDta: any
  @Input() set row(row) {
    if (row) {
      this.rowDta = row;
      this.setSelectedVale();

    }
  };
  @Input() items:any[] = [];
  @Input() placeholder:string;



  selectedAttributes: any = null;
  constructor() { }



  setSelectedVale() {
    this.selectedAttributes = this.items.filter(element => element?.value == this.rowDta[this.propertyName])[0]?.value
  }

}
