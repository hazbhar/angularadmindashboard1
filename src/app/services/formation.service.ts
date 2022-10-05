import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../models/Formation';
import { Constants } from '../config/constant';


@Injectable({
  providedIn: 'root'
})
export class FormationService {
  addHttpOption = {
    headers: new HttpHeaders ({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'

    })
  }

  constructor(private http: HttpClient,  private config : Constants) { }

  getAll() {
    return this.http.get<Formation[]>(this.config.API_FORMATION+"getall",this.addHttpOption);
  }

  get(id: any): Observable<Formation> {
    return this.http.get<Formation>(this.config.API_FORMATION+'getById?id='+id);
  }

  create(data: any, id : any): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('typeForId',id)
    return this.http.post(this.config.API_FORMATION+"add?typeForId="+id, data);
  }

  update(data:Formation): Observable<any> {
    return this.http.put(`${this.config.API_FORMATION}update?id=`+data.id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.config.API_FORMATION+"delete?id="+id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.config.API_FORMATION);
  }


}
