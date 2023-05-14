/* eslint-disable @angular-eslint/directive-selector */
import { AfterContentChecked, Directive } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Directive({
  selector: '[appNgxResizeWatcher]'
})
export class NgxResizeWatcherDirective implements AfterContentChecked {

  private latestWidth: number;

  constructor(private table: DatatableComponent) { }

  ngAfterContentChecked() {
    if (this.table && this.table.element.clientWidth !== this.latestWidth) {
        this.latestWidth = this.table.element.clientWidth;
        this.table.recalculate();
    }

  }

}
