import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  createLanguage(body: any,): Observable<any> {
    const url = `${this.baseURL}Language/add`;
    return this.http.post(url,body);
  }
  getLanguageById(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Language`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getLanguage(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Language/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  LanguageTranslation(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Language/edit-translations`;
    return this.http.put(url,fetchCriteria );
  }
  deleteLanguage(id) {
    const url = `${this.baseURL}Language?code=${id}`;
    return this.http.delete(url);
  }
  SearchLanguage(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Language/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }

  editLanguage(body: any,): Observable<any> {
    const url = `${this.baseURL}Language/edit`;
    return this.http.put(url,body);
  }
  deletevisitTrans(id:number): Observable<any> {
    const url = `${this.baseURL}Language/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
}
