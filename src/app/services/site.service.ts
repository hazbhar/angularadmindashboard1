import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservableInput, retry } from 'rxjs';
import { Constants } from '../config/constant';
import { Site } from '../models/Site';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
    }),
  };
  errorHandl: (err: any, caught: Observable<any>) => ObservableInput<any>;
  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<Site[]> {
    return this.http.get<Site[]>(this.config.API_Site + 'getall',this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  get(id: any): Observable<Site> {
    return this.http.get<Site>(`${this.config.API_Site}getById?id=${id}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  create(id: any, data: any): Observable<any> {
    return this.http.post<any>(this.config.API_Site + 'add', data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.config.API_Site}update?id=${id}`, data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.config.API_Site}delete?id=${id}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
}
