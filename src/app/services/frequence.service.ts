import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservableInput, retry } from 'rxjs';
import { Constants } from '../config/constant';
import { Frequence } from '../models/Frequence';

@Injectable({
  providedIn: 'root',
})
export class FrequenceService {
  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };
  errorHandl: (err: any, caught: Observable<any>) => ObservableInput<any>;
  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<Frequence[]> {
    return this.http.get<Frequence[]>(this.config.API_Frequence + 'getall',this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  get(id: any): Observable<Frequence> {
    return this.http.get<Frequence>(`${this.config.API_Frequence}getById?id=${id}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  create(id: any, data: any): Observable<any> {
    return this.http.post<any>(this.config.API_Frequence + 'add', data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.config.API_Frequence}update?id=${id}`, data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.config.API_Frequence}delete?id=${id}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
}
