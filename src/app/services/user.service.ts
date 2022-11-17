import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservableInput, retry } from 'rxjs';
import { Constants } from '../config/constant';
import { User } from '../models/User';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };
  errorHandl: (err: any, caught: Observable<any>) => ObservableInput<any>;

  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.config.API_USER + 'getall',this.addHttpOption).pipe(retry(0), catchError(this.errorHandl));
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(`${this.config.API_USER}getById?id=${id}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  create(id: any, data: any): Observable<any> {
    return this.http.post<any>(this.config.API_USER + 'add?authId=' + id, data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  update(id: any, data: any,authId:any): Observable<any> {
    return this.http.put<any>(`${this.config.API_USER}update?id=${id}&authId=${authId}`, data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  updatePass(id: any, oldpassword: any,password:any,confpassword:any): Observable<any> {
    return this.http.put<any>(`${this.config.API_USER}updatePassword?id=${id}&oldpassword=${oldpassword}&password=${password}&confpassword=${confpassword}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.config.API_USER}delete?id=${id}`,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
}
