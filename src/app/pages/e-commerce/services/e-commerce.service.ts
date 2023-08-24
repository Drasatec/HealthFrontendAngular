import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ECommerceService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  getChart(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}dashboard/statistics/booking-statistics?year=2023`;
    return this.http.get(url,{ params: fetchCriteria });
  }
}