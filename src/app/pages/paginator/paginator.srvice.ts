import {Component, Injectable, NgModule} from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {Subject} from 'rxjs';
// import $localize from '@angular/localize'
@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`الصفحة الاولي`;
  itemsPerPageLabel = $localize`عدد العناصر بالصفحة:`;
  lastPageLabel = $localize`اخر صفحة`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'التالي';
  previousPageLabel = 'السابق';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`صفحة 1 من 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`صفحة ${page + 1} من ${amountPages}`;
  }
}
