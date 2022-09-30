import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../config/constant';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,  private config : Constants) { }

  getAll(): Observable<User[]> {

    return this.http.get<User[]>(this.config.API_USER+"getall");
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(`${this.config.API_USER}getById?id=${id}`);
  }

  create(id: any, data: any): Observable<any> {
    return this.http.post(this.config.API_USER+"add?authId="+id, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.config.API_USER}update?id=${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.config.API_USER}delete?id=${id}`);
  }
}
