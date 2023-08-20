import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  changeConfirmationCode(code: any): Observable<any> {
    const url = `${this.baseURL}ConfirmationOption/edit-chosen?code=${code}`;
    return this.http.put(url,'');
  }
  getConfirmationCode(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}ConfirmationOption/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
}