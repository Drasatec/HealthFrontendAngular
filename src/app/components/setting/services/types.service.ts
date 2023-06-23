import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  /** RoomTypes */
  roomTypesTranslation(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}RoomType/edit-translations`;
    return this.http.put(url,fetchCriteria );
  }
  getRoomTypesById(id,fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}RoomType?id=${id}`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getRoomTypes(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}RoomType/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  deleteRoomTypes(id) {
    const url = `${this.baseURL}RoomType/delete?id=${id}`;
    return this.http.delete(url);
  }
  SearchRoomTypes(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}RoomType/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  createRoomTypes(body: any,): Observable<any> {
    const url = `${this.baseURL}RoomType/add`;
    return this.http.post(url,body);
  }
  editRoomTypes(body: any,): Observable<any> {
    const url = `${this.baseURL}RoomType/edit`;
    return this.http.put(url,body);
  }
  deleteTrans(id:number): Observable<any> {
    const url = `${this.baseURL}RoomType/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }

}
