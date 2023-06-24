import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PricecatrgoryService {

  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  priceCategoryTranslation(fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}PriceCategory/edit-translations`;
  return this.http.put(url,fetchCriteria );
}
getPriceCategoryById(id,fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}PriceCategory?id=${id}`;
  return this.http.get(url,{ params: fetchCriteria });
}
getPriceCategory(fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}PriceCategory/all`;
  return this.http.get(url,{ params: fetchCriteria });
}
deletePriceCategory(id) {
  const url = `${this.baseURL}PriceCategory/delete?id=${id}`;
  return this.http.delete(url);
}
SearchPriceCategory(fetchCriteria?: any): Observable<any> {
  const url = `${this.baseURL}PriceCategory/search`;
  return this.http.get(url,{ params: fetchCriteria });
}
createPriceCategory(body: any,): Observable<any> {
  const url = `${this.baseURL}PriceCategory/add`;
  return this.http.post(url,body);
}
editPriceCategory(body: any,): Observable<any> {
  const url = `${this.baseURL}PriceCategory/edit`;
  return this.http.put(url,body);
}
deletePriceCategoryTrans(id:number): Observable<any> {
  const url = `${this.baseURL}PriceCategory/delete-translat?translteId=${id}`;
  return this.http.delete(url);
}
}
