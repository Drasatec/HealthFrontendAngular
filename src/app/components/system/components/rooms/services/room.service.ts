import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  getAllRooms(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Room/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  SearchRoom(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Room/search`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getRoomById(id,paylod?){
    const url = `${this.baseURL}Room?id=${id}`;
    return this.http.get(url,{ params: paylod });
  }
  addTranslation(id,body){
    const url = `${this.baseURL}Room/edit-translations/${id}`;
    return this.http.put(url,body);
  }

  createRoom(body: any,): Observable<any> {
    const url = `${this.baseURL}Room/add`;
    return this.http.post(url,body);
  }
  editRoom(id,body: any,): Observable<any> {
    const url = `${this.baseURL}Room/edit/${id}`;
    return this.http.put(url,body);
  }


  activeRoom(id,status) {
    const url = `${this.baseURL}Room/deactivate?id=${id}&status=${status}`;
    return this.http.put(url,'');
  }
  deleteTrans(id) {
    const url = `${this.baseURL}Room/delete-translat?translteId=${id}`;
    return this.http.delete(url);
  }
}
