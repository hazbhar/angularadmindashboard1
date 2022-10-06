import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../config/constant';

@Injectable({
  providedIn: 'root',
})
export class EtatcivilService {
  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<any[]> {
    return this.http.get<any>(this.config.API_EtatCivil + 'getall');
  }
  get(id: any): Observable<any> {
    return this.http.get<any>(`${this.config.API_EtatCivil}getById?id=${id}`);
  }
  create(id: any, data: any): Observable<any> {
    return this.http.post(this.config.API_EtatCivil + 'add?', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.config.API_EtatCivil}/update${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.config.API_EtatCivil}delete?id=${id}`);
  }
}
