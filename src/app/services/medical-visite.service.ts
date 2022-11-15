import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,ObservableInput,throwError } from 'rxjs';
import { Constants } from '../config/constant';
import { MedicalVisit } from '../models/MedicalVisit';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicalVisiteService {

  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };
  errorHandl: (err: any, caught: Observable<any>) => ObservableInput<any>;

  constructor(private http: HttpClient, private config: Constants) {}

  getAll(): Observable<MedicalVisit[]> {
    return this.http.get<MedicalVisit[]>(this.config.API_MedVis + 'getall',this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  get(id: any): Observable<MedicalVisit> {
    return this.http.get<MedicalVisit>(this.config.API_MedVis+"getById?id="+id,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
  create(id: any, data: any): Observable<any> {
    console.log(JSON.stringify(data))
    return this.http.post<any>(this.config.API_MedVis + 'add?empId='+id, JSON.stringify(data),this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(this.config.API_MedVis+"update?id="+id, data,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.config.API_MedVis+"delete?id="+id,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }
}
