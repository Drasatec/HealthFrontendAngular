import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor() { }
  data=[
    {id: 1, title: 'Angular 2 Tutorial', category: 'Angular', writer: 'Krishna'},
    {id: 2, title: 'Angular 6 Tutorial', category: 'Angular', writer: 'Mahesh'},
    {id: 3, title: 'Spring MVC tutorial', category: 'Spring', writer: 'Aman'},
    {id: 4, title: 'Spring Boot tutorial', category: 'Spring', writer: 'Suraj'},
    {id: 5, title: 'FreeMarker Tutorial', category: 'FreeMarker', writer: 'Krishna'},
    {id: 6, title: 'Thymeleaf Tutorial', category: 'Thymeleaf', writer: 'Mahesh'},
    {id: 7, title: 'Java 8 Tutorial', category: 'Java', writer: 'Aman'},
    {id: 8, title: 'Java 9 Tutorial', category: 'Java', writer: 'Suraj'}
  ]
  getAllArticles(){
    return this.data
  }
}
