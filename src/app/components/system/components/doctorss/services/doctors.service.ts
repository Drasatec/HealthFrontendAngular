import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  getAllDoctors(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Doctor/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  SearchDoctor(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Doctor/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getDoctorById(id,paylod?){
    const url = `${this.baseURL}Doctor?id=${id}`;
    return this.http.get(url,{ params: paylod });
  }
  addTranslation(id,body){
    const url = `${this.baseURL}Doctor/edit-translations`;
    return this.http.put(url,body);
  }
  deleteTrans(id) {
    const url = `${this.baseURL}Doctor/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
  createDoctor(body: any,): Observable<any> {
    const url = `${this.baseURL}Doctor/add`;
    return this.http.post(url,body);
  }
  editDoctor(id,body: any,): Observable<any> {
    const url = `${this.baseURL}Doctor/edit/${id}`;
    return this.http.put(url,body);
  }


  activeDoctor(id,status) {
    const url = `${this.baseURL}Doctor/deactivate?id=${id}&status=${status}`;
    return this.http.put(url,'');
  }

  /* Visit price */
  createVisitPrice(body: any,): Observable<any> {
    const url = `${this.baseURL}DoctorVisitPrice/add`;
    return this.http.post(url,body);
  }
  getDoctorVisit(fetchCriteria?): Observable<any> {
    const url = `${this.baseURL}DoctorVisitPrice`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  editDoctorVisit(body: any,): Observable<any> {
    const url = `${this.baseURL}DoctorVisitPrice/edit`;
    return this.http.put(url,body);
  }
  deleteDoctorVisit(id) {
    const url = `${this.baseURL}DoctorVisitPrice?id=${id}`;
    return this.http.delete(url);
  }
}
