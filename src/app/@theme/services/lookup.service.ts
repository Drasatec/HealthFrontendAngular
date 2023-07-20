import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  baseURL: string = environment.apiUrl;

  search_ademic$ = new BehaviorSubject("");
  private subjectBehaviorPeriods = new BehaviorSubject<any>({});

constructor(private http: HttpClient) {}

getAllHospitalsNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Hospital/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllBuildingsNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}building/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllFloorssNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Floor/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllRoomsNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Room/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllClinicsNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Clinic/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllSpecialNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}MedicalSpecialty/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllRoomTypesNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}RoomType/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllNationalityNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Nationality/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllWorkingPeriodNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}WorkingPeriod/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllVisitTypesNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}TypesVisit/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllPriceCategoryNames(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}PriceCategory/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllWorkWeek(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Weekday/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllDegrees(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}DoctorsDegree/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllStatus(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}EmployeeStatus/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllGender(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}HumanGender/names?lang=ar`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllCurrency(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Currency/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
  getAllSsn(fetchCriteria?: any): Observable<any> {
    const url = `${this.baseURL}Ssntype/all`;
    return this.http.get(url,{ params: fetchCriteria });
  }
}
