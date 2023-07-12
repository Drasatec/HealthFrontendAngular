import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorStatusService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  /** Status */

  createStatus(body: any,): Observable<any> {
    const url = `${this.baseURL}EmployeeStatus/add`;
    return this.http.post(url,body);
  }
  getStatusById(id,fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}EmployeeStatus?id=${id}`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getStatus(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}EmployeeStatus/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  StatusTranslation(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}EmployeeStatus/edit-translations`;
    return this.http.put(url,fetchCriteria );
  }
  deleteStatus(id) {
    const url = `${this.baseURL}EmployeeStatus/delete?id=${id}`;
    return this.http.delete(url);
  }
  SearchStatus(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}EmployeeStatus/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }

  editStatus(body: any,): Observable<any> {
    const url = `${this.baseURL}EmployeeStatus/edit`;
    return this.http.put(url,body);
  }
  deleteTranslation(id:number): Observable<any> {
    const url = `${this.baseURL}EmployeeStatus/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
}
