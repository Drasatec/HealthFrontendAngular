import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReligionsService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  /** Degree */

  createReligion(body: any,): Observable<any> {
    const url = `${this.baseURL}Religion/add`;
    return this.http.post(url,body);
  }
  getDegreeById(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Religion`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getDegree(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Religion/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  DegreeTranslation(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Religion/edit-translations`;
    return this.http.put(url,fetchCriteria );
  }
  deleteDegree(id) {
    const url = `${this.baseURL}Religion/delete?id=${id}`;
    return this.http.delete(url);
  }
  SearchDegree(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Religion/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }

  editDegree(body: any,): Observable<any> {
    const url = `${this.baseURL}Religion/edit`;
    return this.http.put(url,body);
  }
  deletevisitTrans(id:number): Observable<any> {
    const url = `${this.baseURL}Religion/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
}
