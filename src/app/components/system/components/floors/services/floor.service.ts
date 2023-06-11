import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  getAllHospitals(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Hospital/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  SearchHospital(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Hospital/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getHospitalById(id,paylod?){
    const url = `${this.baseURL}Hospital?id=${id}`;
    return this.http.get(url,{ params: paylod });
  }
  addTranslation(id,body){
    const url = `${this.baseURL}Hospital/edit-translations/${id}`;
    return this.http.put(url,body);
  }

  createHospital(body: any,): Observable<any> {
    const url = `${this.baseURL}Hospital/add`;
    return this.http.post(url,body);
  }
  editHospital(id,body: any,): Observable<any> {
    const url = `${this.baseURL}Hospital/edit/${id}`;
    return this.http.put(url,body);
  }


  activeHospital(id,status) {
    const url = `${this.baseURL}Hospital/deactivate?id=${id}&status=${status}`;
    return this.http.put(url,'');
  }
}
