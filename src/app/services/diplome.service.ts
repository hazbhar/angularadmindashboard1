import { Diplome } from './../Model/Diplome';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiplomeService {

  constructor(private http: HttpClient,  private config : Constants) { }

  getAll() {
    return this.http.get<Diplome[]>("http://localhost:8082/ged/formation/getall");
  }

  get(id: any): Observable<Diplome> {
    return this.http.get<Diplome>(this.config.API_DIPLOME+id);
  }

  create(data: any, id : any): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('typeForId',id)
    return this.http.post(this.config.API_DIPLOME+"add?typeForId=1", data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.config.API_DIPLOME}/{id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.config.API_DIPLOME+"delete?id="+id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.config.API_DIPLOME);
  }

}
