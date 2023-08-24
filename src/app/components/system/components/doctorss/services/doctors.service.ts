import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  baseURL: string = environment.apiUrl;
  attachURL :string =environment.showAttach;
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
  addDoctorToHos(body:any):Observable<any>{
    const url = `${this.baseURL}Doctor/WorkHospital-add`;
    return this.http.post(url,body);
  }
  deleteDocHos(hos,doc) {
    const url = `${this.baseURL}Doctor/WorkHospital-delete?hospitalId=${hos}&doctorId=${doc}`;
    return this.http.delete(url);
  }
  addDoctorToSpecial(body:any):Observable<any>{
    const url = `${this.baseURL}Doctor/specialy-add`;
    return this.http.post(url,body);
  }
  deleteDocSpecial(spe,doc) {
    const url = `${this.baseURL}Doctor/specialy-delete?doctorId=${doc}&specialtyId=${spe}`;
    return this.http.delete(url);
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

   /* حperiods */
  createPeriod(body: any,): Observable<any> {
    const url = `${this.baseURL}DoctorWorkPeriod/add`;
    return this.http.post(url,body);
  }
  getDoctorPeriod(fetchCriteria?): Observable<any> {
    const url = `${this.baseURL}DoctorWorkPeriod`;
    return this.http.get(url,{ params: fetchCriteria });
  }

  editDoctorPeriod(body: any,): Observable<any> {
    const url = `${this.baseURL}DoctorWorkPeriod/edit`;
    return this.http.put(url,body);
  }
  deleteDoctorPeriod(id) {
    const url = `${this.baseURL}DoctorWorkPeriod/delete?id=${id}`;
    return this.http.delete(url);
  }
     /* attachment */
     uploadAttachment(body: any,): Observable<any> {
      const url = `${this.baseURL}Doctor/add_attachment`;
      return this.http.post(url,body);
    }
    getAttachmentById(fetchCriteria): Observable<any> {
      const url = `${this.baseURL}Doctor/get_attachment`;
      return this.http.get(url,{ params: fetchCriteria });
    }
    getAllAttachment(fetchCriteria): Observable<any> {
      const url = `${this.baseURL}Doctor/get-all_attachments`;
      return this.http.get(url,{ params: fetchCriteria });
    }
    editAttachment(body: any,): Observable<any> {
      const url = `${this.baseURL}/Doctor/edit_attachment`;
      return this.http.put(url,body);
    }
    deleteAttachment(id) {
      const url = `${this.baseURL}Doctor/delete_attachment?id=${id}`;
      return this.http.delete(url);
    }
    showAttachment(name): Observable<any> {
      const url = `${this.attachURL}Files/${name}`;
      return this.http.get(url);
    }
}
