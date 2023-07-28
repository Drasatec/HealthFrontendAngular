import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  getAllBookings(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Booking`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  createBooking(body: any,id): Observable<any> {
    const url = `${this.baseURL}Booking/add?clinicId=${id}&lang=ar`;
    return this.http.post(url,body);
  }

  editBooking(body: any): Observable<any> {
    const url = `${this.baseURL}Booking/edit`;
    return this.http.put(url,body);
  }
  deleteBooking(id:number): Observable<any> {
    const url = `${this.baseURL}Booking?id=${id}`;
    return this.http.delete(url);
  }
}
