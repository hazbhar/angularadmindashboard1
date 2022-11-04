import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<any[]> {
    return this.http.get<any>(this.config.API_Habili + 'getall',this.addHttpOption);
  }
  get(id: any): Observable<any> {
    return this.http.get<any>(`${this.config.API_Habili}getById?id=${id}`,this.addHttpOption);
  }
  create(id: any, data: any): Observable<any> {
    return this.http.post(this.config.API_Habili + 'add', data,this.addHttpOption);
  }
  update(data: Habilitation): Observable<any> {
    return this.http.put(
      `${this.config.API_Habili}update?id=` + data.id,
      data
    );
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.config.API_Habili}delete?id=${id}`,this.addHttpOption);
  }
}
