import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrancyService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  createCurrency(body: any,): Observable<any> {
    const url = `${this.baseURL}Currency/add`;
    return this.http.post(url,body);
  }
  getCurrencyById(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Currency`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getCurrency(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Currency/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  CurrencyTranslation(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Currency/edit-translations`;
    return this.http.put(url,fetchCriteria );
  }
  deleteCurrency(id) {
    const url = `${this.baseURL}Currency/delete?id=${id}`;
    return this.http.delete(url);
  }
  SearchCurrency(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Currency/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }

  editCurrency(body: any,): Observable<any> {
    const url = `${this.baseURL}Currency/edit`;
    return this.http.put(url,body);
  }
  deletevisitTrans(id:number): Observable<any> {
    const url = `${this.baseURL}Currency/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
}
