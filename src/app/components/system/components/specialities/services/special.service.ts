import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialService {

  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  getAllMedicalSpecials(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}MedicalSpecialty/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  SearchMedicalSpecial(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}MedicalSpecialty/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getMedicalSpecialById(id,paylod?){
    const url = `${this.baseURL}MedicalSpecialty?id=${id}`;
    return this.http.get(url,{ params: paylod });
  }
  addTranslation(id,body){
    const url = `${this.baseURL}MedicalSpecialty/edit-translations/${id}`;
    return this.http.put(url,body);
  }

  createMedicalSpecial(body: any,): Observable<any> {
    const url = `${this.baseURL}MedicalSpecialty/add`;
    return this.http.post(url,body);
  }
  editMedicalSpecial(id,body: any,): Observable<any> {
    const url = `${this.baseURL}MedicalSpecialty/edit/${id}`;
    return this.http.put(url,body);
  }


  activeMedicalSpecialty(id,status) {
    const url = `${this.baseURL}MedicalSpecialty/deactivate?id=${id}&status=${status}`;
    return this.http.put(url,'');
  }
  deleteTrans(id) {
    const url = `${this.baseURL}MedicalSpecialty/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
}
