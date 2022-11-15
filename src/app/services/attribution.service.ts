import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,ObservableInput,throwError } from 'rxjs';
import { Constants } from '../config/constant';
import { Attribution } from '../models/Attribution';
import { retry, catchError } from 'rxjs/operators';

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
  errorHandl: (err: any, caught: Observable<Attribution>) => ObservableInput<any>;

  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.config.API_Attrub + 'getall',this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  get(id: any): Observable<Attribution> {
    return this.http.get<Attribution>(this.config.API_Attrub +"getAttribution?id="+ id,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  getByRelationEmpId(id: any): Observable<Attribution> {
    return this.http.get<Attribution>(this.config.API_Attrub +"getByidAttributionEmployee?id="+ id,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  create(data: any, id: any): Observable<any> {

    return this.http.post<any>(this.config.API_Attrub + 'add?empId='+id, data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(this.config.API_Attrub+"update?id="+id, data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.config.API_Attrub + 'delete?id=' + id).pipe(retry(1), catchError(this.errorHandl));
  }

  deleteAll(): Observable<any> {
    return this.http.delete<any>(this.config.API_Attrub).pipe(retry(1), catchError(this.errorHandl));
  }
}
