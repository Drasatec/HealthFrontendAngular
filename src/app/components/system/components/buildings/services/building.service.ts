import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  getAllBuildingss(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}buildings/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  SearchBuildings(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}buildings/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getBuildingsById(id,paylod?){
    const url = `${this.baseURL}building?id=${id}`;
    return this.http.get(url,{ params: paylod });
  }
  addTranslation(id,body){
    const url = `${this.baseURL}building/edit-translations/${id}`;
    return this.http.put(url,body);
  }

  createBuildings(body: any,): Observable<any> {
    const url = `${this.baseURL}building/add`;
    return this.http.post(url,body);
  }
  editBuildings(id,body: any,): Observable<any> {
    const url = `${this.baseURL}building/edit/${id}`;
    return this.http.put(url,body);
  }


  activeBuildings(id,status) {
    const url = `${this.baseURL}building/deactivate?id=${id}&status=${status}`;
    return this.http.put(url,'');
  }
  deleteTrans(id) {
    const url = `${this.baseURL}building/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
}
