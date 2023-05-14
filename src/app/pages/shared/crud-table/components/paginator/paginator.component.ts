/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageSizes, PaginatorState } from '../../models/paginator.model';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() paginator: PaginatorState;
  @Input() isLoading;
  @Input() showStatusText: boolean = true;
  @Output() paginate: EventEmitter<PaginatorState> = new EventEmitter();
  pageSizes: number[] = PageSizes;
  smallDevices: boolean = false;

  private subscription : Subscription = new Subscription();
  constructor(
    public _BreakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
    this.detectSmallBreakpoint();
  }


  detectSmallBreakpoint(): void {
    this._BreakpointObserver
    .observe(['(max-width: 456px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.smallDevices = true;
      } else {
        this.smallDevices = false;
      }
    });
  }


  pageChange(num: number) {
    this.paginator.current_page = num;
    this.paginate.emit(this.paginator);
  }

  sizeChange(page_size) {
    if(typeof page_size == "string"){
      this.paginator.per_page=this.paginator.total
    }else{
      this.paginator.per_page = page_size;
    }

    this.paginator.current_page = 1;
    this.paginate.emit(this.paginator);
  }


}
