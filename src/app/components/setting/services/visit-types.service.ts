import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitTypesService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  /** VisitTypes */
  visitTypesTranslation(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}TypesVisit/edit-translations`;
    return this.http.put(url,fetchCriteria );
  }
  getvisitTypesById(id,fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}TypesVisit?id=${id}`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getvisitTypes(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}TypesVisit/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  deletevisitTypes(id) {
    const url = `${this.baseURL}TypesVisit/delete?id=${id}`;
    return this.http.delete(url);
  }
  SearchvisitTypes(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}TypesVisit/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  createvisitTypes(body: any,): Observable<any> {
    const url = `${this.baseURL}TypesVisit/add`;
    return this.http.post(url,body);
  }
  editvisitTypes(body: any,): Observable<any> {
    const url = `${this.baseURL}TypesVisit/edit`;
    return this.http.put(url,body);
  }
  deletevisitTrans(id:number): Observable<any> {
    const url = `${this.baseURL}TypesVisit/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
}
