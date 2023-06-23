import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SsntypesService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

ssnTypesTranslation(fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}Ssntype/edit-translations`;
  return this.http.put(url,fetchCriteria );
}
getssnTypesById(id,fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}Ssntype?id=${id}`;
  return this.http.get(url,{ params: fetchCriteria });
}
getssnTypes(fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}Ssntype/all`;
  return this.http.get(url,{ params: fetchCriteria });
}
deletessnTypes(id) {
  const url = `${this.baseURL}Ssntype/delete?id=${id}`;
  return this.http.delete(url);
}
SearchssnTypes(fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}Ssntype/search`;
  return this.http.get(url,{ params: fetchCriteria });
}
createssnTypes(body: any,): Observable<any> {
  const url = `${this.baseURL}Ssntype/add`;
  return this.http.post(url,body);
}
editssnTypes(body: any,): Observable<any> {
  const url = `${this.baseURL}Ssntype/edit`;
  return this.http.put(url,body);
}
deletessnTrans(id:number): Observable<any> {
  const url = `${this.baseURL}Ssntype/delete-translat?translteId=${id}`;
  return this.http.delete(url);
}
}
