import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservableInput, retry } from 'rxjs';
import { Constants } from '../config/constant';
import { TypeOfStaff } from '../models/TypeOfStaff';

@Injectable({
  providedIn: 'root',
})
export class TypepersonnelService {
  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };
  errorHandl: (err: any, caught: Observable<any>) => ObservableInput<any>;

  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<TypeOfStaff[]> {
    return this.http.get<TypeOfStaff[]>(this.config.API_PERSOTYP + 'getall',this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  get(id: any): Observable<TypeOfStaff> {
    return this.http.get<TypeOfStaff>(`${this.config.API_PERSOTYP}getById?id=${id}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  create(id: any, data: any): Observable<any> {
    return this.http.post<any>(this.config.API_PERSOTYP + 'add', data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.config.API_PERSOTYP}update?id=${id}`, data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.config.API_PERSOTYP}delete?id=${id}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
}
