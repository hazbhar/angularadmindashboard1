import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../config/constant';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<any[]> {
    return this.http.get<any>(this.config.API_Process + 'getall');
  }
  get(id: any): Observable<any> {
    return this.http.get<any>(`${this.config.API_Process}getById?id=${id}`);
  }
  create(id: any, data: any): Observable<any> {
    return this.http.post(this.config.API_Process + 'add?', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.config.API_Process}update${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.config.API_Process}delete?id=${id}`);
  }
}
