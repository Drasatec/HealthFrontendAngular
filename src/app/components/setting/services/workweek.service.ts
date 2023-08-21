import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkweekService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  /** VisitTypes */
  addWorkWeek(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Weekday/add`;
    return this.http.post(url,fetchCriteria );
  }
  editWorkWeek(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Weekday/edit`;
    return this.http.put(url,fetchCriteria );
  }
  getWorkWeekById(id,fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Weekday?id=${id}`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllWorkWeek(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Weekday/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  deleteWorkWeek(id): Observable<any> {
    const url = `${this.baseURL}Weekday/delete?id=${id}`;
    return this.http.delete(url);
  }
  getWorkWeekTranslation(id): Observable<any> {
    const url = `${this.baseURL}Weekday/day?day=${id}`;
    return this.http.get(url);
  }
}
