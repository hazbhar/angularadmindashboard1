import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constant';
import { Observable } from 'rxjs';
import { Diploma } from '../models/Diploma';

@Injectable({
  providedIn: 'root',
})
export class DiplomaService {

  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };

  constructor(private http: HttpClient, private config: Constants) {}

  getAll() {
    return this.http.get<Diploma[]>(this.config.API_DIPLOME + 'getall');
  }

  get(id: any): Observable<Diploma> {
    return this.http.get<Diploma>(this.config.API_DIPLOME + 'getById?id='+id);
  }

  create(data: any, id: any): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('typeForId', id);
    return this.http.post(this.config.API_DIPLOME + 'add', data);
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
