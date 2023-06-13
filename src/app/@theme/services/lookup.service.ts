import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

constructor(private http: HttpClient) {}

getAllHospitalsNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Hospital/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllBuildingsNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}building/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllFloorssNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Floor/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
}
