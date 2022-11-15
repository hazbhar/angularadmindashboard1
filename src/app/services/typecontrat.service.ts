import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservableInput, retry } from 'rxjs';
import { Constants } from '../config/constant';
import { typeContrat } from '../models/TypeContrat';

@Injectable({
  providedIn: 'root',
})
export class TypecontratService {
  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };
  errorHandl: (err: any, caught: Observable<any>) => ObservableInput<any>;
  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<typeContrat[]> {
    return this.http.get<typeContrat[]>(this.config.API_contractType + 'getall').pipe(retry(1), catchError(this.errorHandl));
  }
  get(id: any): Observable<typeContrat> {
    return this.http.get<typeContrat>(
      `${this.config.API_contractType}getById?id=${id}`,this.addHttpOption
    ).pipe(retry(1), catchError(this.errorHandl));
  }
  create(id: any, data: any): Observable<any> {
    return this.http.post<any>(this.config.API_contractType + 'add', data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.config.API_contractType}update?id=${id}`, data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.config.API_contractType}delete?id=${id}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
}
