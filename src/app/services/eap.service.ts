import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,ObservableInput,throwError } from 'rxjs';
import { Constants } from '../config/constant';
import { Eap } from '../models/Eap';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EapService {

  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };
  errorHandl: (err: any, caught: Observable<any>) => ObservableInput<any>;

  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<Eap[]> {
    return this.http.get<Eap[]>(this.config.API_Eap + 'getall',this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  get(id: any): Observable<Eap> {
    return this.http.get<Eap>(this.config.API_Eap+"getById?id="+id,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  create( data: any): Observable<any> {
    return this.http.post<any>(this.config.API_Eap + 'add', data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(this.config.API_Eap+"update?id="+id, data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.config.API_Eap}delete?id=${id}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
}
