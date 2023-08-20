import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingStatusService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  createBookingStatus(body: any,): Observable<any> {
    const url = `${this.baseURL}BookingStatus/add`;
    return this.http.post(url,body);
  }
  getBookingStatusById(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}BookingStatus`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getBookingStatus(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}BookingStatus/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  BookingStatusTranslation(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}BookingStatus/edit-translations`;
    return this.http.put(url,fetchCriteria );
  }
  deleteBookingStatus(id) {
    const url = `${this.baseURL}BookingStatus/delete?id=${id}`;
    return this.http.delete(url);
  }
  SearchBookingStatus(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}BookingStatus/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }

  editBookingStatus(body: any,): Observable<any> {
    const url = `${this.baseURL}BookingStatus/edit`;
    return this.http.put(url,body);
  }
  deletevisitTrans(id:number): Observable<any> {
    const url = `${this.baseURL}BookingStatus/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
}
