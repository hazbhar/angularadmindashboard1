import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constant';
import { catchError, Observable, ObservableInput, retry } from 'rxjs';
import { Diploma } from '../models/Diploma';

@Injectable({
  providedIn: 'root',
})
export class DiplomaService {

  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };
  errorHandl: (err: any, caught: Observable<any>) => ObservableInput<any>;

  constructor(private http: HttpClient, private config: Constants) {}

  getAll() {
    return this.http.get<Diploma[]>(this.config.API_DIPLOME + 'getall').pipe(retry(1), catchError(this.errorHandl));
  }

  get(id: any): Observable<Diploma> {
    return this.http.get<Diploma>(this.config.API_DIPLOME + 'getById?id='+id).pipe(retry(1), catchError(this.errorHandl));
  }
  getByRelationEmpId(id: any): Observable<Diploma> {
    return this.http.get<Diploma>(this.config.API_DIPLOME + 'getByIdDiplomaEmployee?id='+id).pipe(retry(1), catchError(this.errorHandl));
  }
  create(data: any, id: any): Observable<any> {

    return this.http.post<any>(this.config.API_DIPLOME + 'add?empId='+id, data).pipe(retry(1), catchError(this.errorHandl));
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(this.config.API_DIPLOME+'update?id='+id, data).pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.config.API_DIPLOME + 'delete?id=' + id).pipe(retry(1), catchError(this.errorHandl));
  }

  deleteAll(): Observable<any> {
    return this.http.delete<any>(this.config.API_DIPLOME).pipe(retry(1), catchError(this.errorHandl));
  }
}
