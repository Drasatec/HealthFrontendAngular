import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  getAllPatients(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Patient/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllPatientsNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Patient/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  SearchPatient(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Patient/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getPatientById(id,paylod?){
    const url = `${this.baseURL}Patient?id=${id}`;
    return this.http.get(url,{ params: paylod });
  }
  addTranslation(id,body){
    const url = `${this.baseURL}Patient/edit-translations/${id}`;
    return this.http.put(url,body);
  }

  createPatient(body: any,): Observable<any> {
    const url = `${this.baseURL}Patient/add`;
    return this.http.post(url,body);
  }
  editPatient(id,body: any,): Observable<any> {
    const url = `${this.baseURL}Patient/edit/${id}`;
    return this.http.put(url,body);
  }


  activePatient(id,status) {
    const url = `${this.baseURL}Patient/deactivate?id=${id}&status=${status}`;
    return this.http.put(url,'');
  }
  deleteTrans(id) {
    const url = `${this.baseURL}Patient/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
}
