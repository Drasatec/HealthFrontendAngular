import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NationalityService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

natioalityTranslation(fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}Nationality/edit-translations`;
  return this.http.put(url,fetchCriteria );
}
getnationalityById(id,fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}Nationality?id=${id}`;
  return this.http.get(url,{ params: fetchCriteria });
}
getnationality(fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}Nationality/all`;
  return this.http.get(url,{ params: fetchCriteria });
}
deletenationality(id) {
  const url = `${this.baseURL}Nationality/delete?id=${id}`;
  return this.http.delete(url);
}
Searchnationality(fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}Nationality/search`;
  return this.http.get(url,{ params: fetchCriteria });
}
createnationality(body: any,): Observable<any> {
  const url = `${this.baseURL}Nationality/add`;
  return this.http.post(url,body);
}
editnationality(body: any,): Observable<any> {
  const url = `${this.baseURL}Nationality/edit`;
  return this.http.put(url,body);
}
deleteNationalTrans(id:number): Observable<any> {
  const url = `${this.baseURL}Nationality/delete-translat?translteId=${id}`;
  return this.http.delete(url);
}
}
