import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  getAllClinics(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Clinic/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  SearchClinic(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Clinic/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getClinicById(id,paylod?){
    const url = `${this.baseURL}Clinic?id=${id}`;
    return this.http.get(url,{ params: paylod });
  }
  addTranslation(id,body){
    const url = `${this.baseURL}Clinic/edit-translations/${id}`;
    return this.http.put(url,body);
  }

  createClinic(body: any,): Observable<any> {
    const url = `${this.baseURL}Clinic/add`;
    return this.http.post(url,body);
  }
  editClinic(id,body: any,): Observable<any> {
    const url = `${this.baseURL}Clinic/edit/${id}`;
    return this.http.put(url,body);
  }


  activeClinic(id,status) {
    const url = `${this.baseURL}Clinic/deactivate?id=${id}&status=${status}`;
    return this.http.put(url,'');
  }
}
