import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationServiceService {
  baseURL: string = environment.apiUrl;
  controller:string
  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  sendController(controller){
    this.controller = controller
  }
  editTranslation(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}${this.controller}/edit-translations`;
    return this.http.put(url,fetchCriteria );
  }
  getById(id,fetchCriteria?: any): Observable<any> {
      const url = `${this.baseURL}${this.controller}?id=${id}`;
      return this.http.get(url,{ params: fetchCriteria });
    }
  deleteTranslation(id:number): Observable<any> {
      const url = `${this.baseURL}${this.controller}/delete-translat?translteId=${id}`;
      return this.http.delete(url);
    }
}
