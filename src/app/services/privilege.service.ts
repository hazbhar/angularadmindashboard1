import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../config/constant';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };

  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<any[]> {
    return this.http.get<any>(this.config.API_Privilege + 'getall',this.addHttpOption);
  }
  get(id: any): Observable<any> {
    return this.http.get<any>(`${this.config.API_Privilege}getById?id=${id}`,this.addHttpOption);
  }
  create(id: any, data: any): Observable<any> {
    return this.http.post(this.config.API_Privilege + 'add?', data,this.addHttpOption);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.config.API_Privilege}update${id}`, data,this.addHttpOption);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.config.API_Privilege}delete?id=${id}`,this.addHttpOption);
  }
}
