import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
@Injectable({
  providedIn: 'root'
})

export class HospitalService {

  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  getAllHospitals(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Hospital/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  SearchHospitalsByName(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Hospital/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getHospitalById(id,paylod?){
    const url = `${this.baseURL}Hospital?id=${id}`;
    return this.http.get(url,{ params: paylod });
  }

  createHospital(body: any,): Observable<any> {
    const url = `${this.baseURL}Hospital/add`;
    return this.http.post(url,body,httpOptions);
  }



  activeHospital(id,status) {
    const url = `${this.baseURL}Hospital/delete?id=${id}&status=${status}`;
    return this.http.put(url,'');
  }
}
