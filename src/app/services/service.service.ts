import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservableInput, retry } from 'rxjs';
import { Constants } from '../config/constant';
import { Service } from '../models/Service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };
  errorHandl: (err: any, caught: Observable<any>) => ObservableInput<any>;
  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(this.config.API_Service + 'getall',this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  get(id: any): Observable<Service> {
    return this.http.get<Service>(`${this.config.API_Service}getById?id=${id}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  create(id: any, data: any): Observable<any> {
    return this.http.post<any>(this.config.API_Service + 'add', data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.config.API_Service}update?id=${id}`, data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.config.API_Service}delete?id=${id}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
}
