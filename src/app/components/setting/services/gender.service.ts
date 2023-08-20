import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  createHumanGender(body: any,): Observable<any> {
    const url = `${this.baseURL}HumanGender/add`;
    return this.http.post(url,body);
  }
  getHumanGenderById(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}HumanGender`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getHumanGender(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}HumanGender/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  HumanGenderTranslation(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}HumanGender/edit-translations`;
    return this.http.put(url,fetchCriteria );
  }
  deleteHumanGender(id) {
    const url = `${this.baseURL}HumanGender/delete?id=${id}`;
    return this.http.delete(url);
  }
  SearchHumanGender(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}HumanGender/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }

  editHumanGender(body: any,): Observable<any> {
    const url = `${this.baseURL}HumanGender/edit`;
    return this.http.put(url,body);
  }
  deletevisitTrans(id:number): Observable<any> {
    const url = `${this.baseURL}HumanGender/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
}
