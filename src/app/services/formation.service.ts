import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, ObservableInput, retry } from 'rxjs';
import { Formation } from '../models/Formation';
import { Constants } from '../config/constant';

@Injectable({
  providedIn: 'root',
})
export class FormationService {
  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };
  errorHandl: (err: any, caught: Observable<any>) => ObservableInput<any>;

  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<Formation[]>  {
    return this.http.get<Formation[]>(
      this.config.API_FORMATION + 'getall',
      this.addHttpOption
    ).pipe(retry(1), catchError(this.errorHandl));
  }

  get(id: any): Observable<Formation> {
    return this.http.get<Formation>(
      this.config.API_FORMATION + 'getById?id=' + id
    ).pipe(retry(1), catchError(this.errorHandl));
  }
  getByRelationEmpId(id: any): Observable<Formation> {
    return this.http.get<Formation>(
      this.config.API_FORMATION + 'getByIdFormationEmployee?id=' + id
    ).pipe(retry(1), catchError(this.errorHandl));
  }
  create(data: any, id: any,formationRenewalDate:any): Observable<any> {

    return this.http.post<any>(
      this.config.API_FORMATION + 'add?empId='+id+"&formationRenewalDate="+formationRenewalDate,
      data
    ).pipe(retry(1), catchError(this.errorHandl));
  }

  update(data: Formation): Observable<any> {
    return this.http.put<any>(
      `${this.config.API_FORMATION}update?id=` + data.id,
      data
    ).pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.config.API_FORMATION + 'delete?id=' + id).pipe(retry(1), catchError(this.errorHandl));
  }

  deleteAll(): Observable<any> {
    return this.http.delete<any>(this.config.API_FORMATION).pipe(retry(1), catchError(this.errorHandl));
  }
}
