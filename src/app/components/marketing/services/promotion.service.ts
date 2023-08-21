import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  
  getPromotionById(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Promotion`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getPromotion(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Promotion/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  createPromotion(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Promotion/add`;
    return this.http.post(url,fetchCriteria );
  }
  editPromotion(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Promotion/edit`;
    return this.http.put(url,fetchCriteria );
  }
  deletePromotion(id) {
    const url = `${this.baseURL}Promotion/delete?id=${id}`;
    return this.http.delete(url);
  }
  deleteTrans(id) {
    const url = `${this.baseURL}Promotion/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
  addTranslation(body){
    const url = `${this.baseURL}Promotion/edit-translations`;
    return this.http.put(url,body);
  }
}