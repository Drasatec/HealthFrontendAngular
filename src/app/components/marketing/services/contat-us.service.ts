import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatUsService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  
  getContactFormById(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}ContactForm`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getContactForm(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}ContactForm/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
 
  deleteContactForm(id) {
    const url = `${this.baseURL}ContactForm?id=${id}`;
    return this.http.delete(url);
  }
  
}
