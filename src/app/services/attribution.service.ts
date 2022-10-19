import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../config/constant';
import { Attribution } from '../models/Attribution';

@Injectable({
  providedIn: 'root'
})
export class AttributionService {

  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };

  constructor(private http: HttpClient, private config: Constants) {}

  getAll() {
    return this.http.get<Attribution[]>(this.config.API_DIPLOME + 'getall');
  }

  get(id: any): Observable<Attribution> {
    return this.http.get<Attribution>(this.config.API_DIPLOME + id);
  }

  create(data: any, id: any): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('typeForId', id);
    return this.http.post(this.config.API_DIPLOME + 'add?typeForId=1', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.config.API_DIPLOME}/{id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.config.API_DIPLOME + 'delete?id=' + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.config.API_DIPLOME);
  }
}
