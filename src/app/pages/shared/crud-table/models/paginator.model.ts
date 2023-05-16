export const PageSizes = [3, 5, 10, 15, 20, 50, 100];

export interface IPaginatorState {
  page: number;
  pageSize: number;
  total: number;
  from?: number;
  to?: number;
  // recalculatePaginator(total: number): IPaginatorState;
}

export class PaginatorState implements IPaginatorState {
  page = 1;
  from?= 0;
  to?= 0;
  current_page = 1;
  per_page = 25;
  pageSize = PageSizes[2];
  total = 0;
  pageSizes: number[] = [];

  // recalculatePaginator(total: number): PaginatorState {
  //   this.total = total;
  //   return this;
  // }
}

export interface IPaginatorView {
  paginator: PaginatorState;
  ngOnInit(): void;
  paginate(paginator: PaginatorState): void;
}
