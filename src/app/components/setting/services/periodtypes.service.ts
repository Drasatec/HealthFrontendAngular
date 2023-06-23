import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodtypesService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

WorkingPeriodsTranslation(fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}WorkingPeriod/edit-translations`;
  return this.http.put(url,fetchCriteria );
}
getWorkingPeriodsById(id,fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}WorkingPeriod?id=${id}`;
  return this.http.get(url,{ params: fetchCriteria });
}
getWorkingPeriods(fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}WorkingPeriod/all`;
  return this.http.get(url,{ params: fetchCriteria });
}
deleteWorkingPeriods(id) {
  const url = `${this.baseURL}WorkingPeriod/delete?id=${id}`;
  return this.http.delete(url);
}
SearchWorkingPeriods(fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}WorkingPeriod/search`;
  return this.http.get(url,{ params: fetchCriteria });
}
createWorkingPeriods(body: any,): Observable<any> {
  const url = `${this.baseURL}WorkingPeriod/add`;
  return this.http.post(url,body);
}
editWorkingPeriods(body: any,): Observable<any> {
  const url = `${this.baseURL}WorkingPeriod/edit`;
  return this.http.put(url,body);
}
deleteperiodTrans(id:number): Observable<any> {
  const url = `${this.baseURL}WorkingPeriod/delete-translat?translteId=${id}`;
  return this.http.delete(url);
}
}
