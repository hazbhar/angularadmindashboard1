import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../config/constant';
import { Employe } from '../models/Employe';

@Injectable({
  providedIn: 'root',
})
export class EmployeService {
  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };
  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<Employe[]> {
    return this.http.get<any>(this.config.API_EMPLOYE + 'getall');
  }
  get(id: any): Observable<Employe> {
    return this.http.get<Employe>(`${this.config.API_EMPLOYE}getById?id=${id}`);
  }
  create(id: any,siteid: any,civilStateId: any,typeStaffId: any, data: any): Observable<any> {
    console.log(JSON.stringify(data));
    return this.http.post(this.config.API_EMPLOYE + 'add?siteid='+siteid+"&civilStateId="+civilStateId+"&typeStaffId="+typeStaffId,JSON.stringify(data),this.addHttpOption);

  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.config.API_EMPLOYE}/update${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.config.API_EMPLOYE}delete?id=${id}`);
  }
}
