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
  getAllHospitalsNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}names?lang=ar`;
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
  deleteTrans(id) {
    const url = `${this.baseURL}Hospital/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
  deletePhone(id) {
    const url = `${this.baseURL}Hospital/delete-phone?phoneId=${id}`;
    return this.http.delete(url);
  }
  createFeatureHospital(body: any,): Observable<any> {
    const url = `${this.baseURL}HospitalFeature/add`;
    return this.http.post(url,body);
  }
  editFeatureHospital(id,body: any,): Observable<any> {
    const url = `${this.baseURL}HospitalFeature/edit/${id}`;
    return this.http.put(url,body);
  }
  featuresHospital(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}HospitalFeature/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  deleteFeature(id) {
    const url = `${this.baseURL}HospitalFeature/delete?id=${id}`;
    return this.http.delete(url);
  }
  getFeatureById(id,paylod?){
    const url = `${this.baseURL}HospitalFeature?id=${id}`;
    return this.http.get(url,{ params: paylod });
  }
  deleteFeatTrans(id) {
    const url = `${this.baseURL}HospitalFeature/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
  addFeatuTranslation(body){
    const url = `${this.baseURL}HospitalFeature/edit-translations`;
    return this.http.put(url,body);
  }
}
