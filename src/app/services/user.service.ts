import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.config.API_USER + 'getall',this.addHttpOption);
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(`${this.config.API_USER}getById?id=${id}`,this.addHttpOption);
  }

  create(id: any, data: any): Observable<any> {
    return this.http.post(this.config.API_USER + 'add?authId=' + id, data,this.addHttpOption);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.config.API_USER}update?id=${id}`, data,this.addHttpOption);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.config.API_USER}delete?id=${id}`,this.addHttpOption);
  }
}
