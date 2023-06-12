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

  getAllFloors(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Floor/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  SearchFloor(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Floor/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getFloorById(id,paylod?){
    const url = `${this.baseURL}Floor?id=${id}`;
    return this.http.get(url,{ params: paylod });
  }
  addTranslation(id,body){
    const url = `${this.baseURL}Floor/edit-translations/${id}`;
    return this.http.put(url,body);
  }

  createFloor(body: any,): Observable<any> {
    const url = `${this.baseURL}Floor/add`;
    return this.http.post(url,body);
  }
  editFloor(id,body: any,): Observable<any> {
    const url = `${this.baseURL}Floor/edit/${id}`;
    return this.http.put(url,body);
  }


  activeFloor(id,status) {
    const url = `${this.baseURL}Floor/deactivate?id=${id}&status=${status}`;
    return this.http.put(url,'');
  }
}
