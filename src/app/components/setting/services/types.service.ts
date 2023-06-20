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

  roomTypesTranslation(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}RoomType/edit-translations`;
    return this.http.put(url,{ params: fetchCriteria });
  }
  getRoomTypesById(id,fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}RoomType?id=${id}`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getRoomTypes(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}RoomType/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  activeRoomTypes(id,status) {
    const url = `${this.baseURL}RoomType/deactivate?id=${id}&status=${status}`;
    return this.http.put(url,'');
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
}
