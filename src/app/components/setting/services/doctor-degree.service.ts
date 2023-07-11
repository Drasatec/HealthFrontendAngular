import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorDegreeService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  /** Degree */

  createDegree(body: any,): Observable<any> {
    const url = `${this.baseURL}DoctorsDegree/add`;
    return this.http.post(url,body);
  }
  getDegreeById(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}DoctorsDegree`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getDegree(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}DoctorsDegree/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  DegreeTranslation(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}DoctorsDegree/edit-translations`;
    return this.http.put(url,fetchCriteria );
  }
  deleteDegree(id) {
    const url = `${this.baseURL}DoctorsDegree/delete?id=${id}`;
    return this.http.delete(url);
  }
  SearchDegree(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}DoctorsDegree/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }

  editDegree(body: any,): Observable<any> {
    const url = `${this.baseURL}DoctorsDegree/edit`;
    return this.http.put(url,body);
  }
  deletevisitTrans(id:number): Observable<any> {
    const url = `${this.baseURL}DoctorsDegree/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
}
