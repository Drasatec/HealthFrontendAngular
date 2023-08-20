import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaritalStatusService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  createMaritalStatus(body: any,): Observable<any> {
    const url = `${this.baseURL}MaritalStatus/add`;
    return this.http.post(url,body);
  }
  getMaritalStatusById(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}MaritalStatus`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getMaritalStatus(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}MaritalStatus/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  MaritalStatusTranslation(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}MaritalStatus/edit-translations`;
    return this.http.put(url,fetchCriteria );
  }
  deleteMaritalStatus(id) {
    const url = `${this.baseURL}MaritalStatus/delete?id=${id}`;
    return this.http.delete(url);
  }
  SearchMaritalStatus(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}MaritalStatus/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }

  editMaritalStatus(body: any,): Observable<any> {
    const url = `${this.baseURL}MaritalStatus/edit`;
    return this.http.put(url,body);
  }
  deletevisitTrans(id:number): Observable<any> {
    const url = `${this.baseURL}MaritalStatus/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
}
