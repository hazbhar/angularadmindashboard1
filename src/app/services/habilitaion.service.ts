import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservableInput, retry } from 'rxjs';
import { Constants } from '../config/constant';
import { Habilitation } from '../models/Habilitation';

@Injectable({
  providedIn: 'root'
})
export class HabilitaionService {
  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };
  errorHandl: (err: any, caught: Observable<any>) => ObservableInput<any>;
  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<Habilitation[]> {
    return this.http.get<Habilitation[]>(this.config.API_Habili + 'getall',this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  get(id: any): Observable<Habilitation> {
    return this.http.get<Habilitation>(`${this.config.API_Habili}getById?id=${id}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  create(id: any, data: any): Observable<any> {
    return this.http.post<any>(this.config.API_Habili + 'add', data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  update(data: Habilitation): Observable<any> {
    return this.http.put<any>(
      `${this.config.API_Habili}update?id=` + data.id,
      data
    ).pipe(retry(1), catchError(this.errorHandl));
  }
  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.config.API_Habili}delete?id=${id}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
}
