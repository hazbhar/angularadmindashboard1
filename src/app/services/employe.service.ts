
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,ObservableInput, retry, catchError } from 'rxjs';
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
  errorHandl: (err: any, caught: Observable<Employe>) => ObservableInput<any>;
  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<Employe[]> {
    return this.http.get<Employe>(this.config.API_EMPLOYE + 'getall').pipe(retry(1), catchError(this.errorHandl));
  }
  get(id: any): Observable<Employe> {
    return this.http.get<Employe>(`${this.config.API_EMPLOYE}getById?id=${id}`).pipe(retry(1), catchError(this.errorHandl));
  }
  create(userid:any,siteid: any,civilStateId: any,typeStaffId: any, data: any): Observable<any> {
    console.log(JSON.stringify(data));
    return this.http.post<any>(this.config.API_EMPLOYE + 'add?siteId='+siteid+"&civilStateId="+civilStateId+"&userId="+userid+"&typeStaffId="+typeStaffId,data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));

  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(this.config.API_EMPLOYE+"update?id="+id, data).pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.config.API_EMPLOYE+"delete?id="+id).pipe(retry(1), catchError(this.errorHandl));
  }
}
