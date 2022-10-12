import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../config/constant';

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
  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<any[]> {
    return this.http.get<any>(this.config.API_contractType + 'getall',this.addHttpOption);
  }
  get(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.config.API_contractType}getById?id=${id}`
    );
  }
  create(id: any, data: any): Observable<any> {
    return this.http.post(this.config.API_contractType + 'add?', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.config.API_contractType}update${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.config.API_contractType}delete?id=${id}`);
  }
}
