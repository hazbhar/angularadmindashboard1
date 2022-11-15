import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservableInput, retry } from 'rxjs';
import { Constants } from '../config/constant';
import { Contract } from '../models/Contract';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };
  errorHandl: (err: any, caught: Observable<any>) => ObservableInput<any>;

  constructor(private http: HttpClient, private config: Constants) {}

  getAll() {
    return this.http.get<Contract[]>(this.config.API_Contrat + 'getall');
  }

  get(id: any): Observable<Contract> {
    return this.http.get<Contract>(this.config.API_Contrat +"getContract?id="+ id,this.addHttpOption).pipe(retry(1), catchError(this.errorHandl));
  }

  create(employeeId: any,contractTypeId: any,frequenceId: any, data: any): Observable<any> {

    return this.http.post<any>(this.config.API_Contrat + 'add?frequenceId=', frequenceId+'&contractTypeId='+contractTypeId+'&employeeId='+employeeId,data).pipe(retry(1), catchError(this.errorHandl));
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(this.config.API_Contrat+"update?id="+id, data).pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.config.API_Contrat + 'delete?id=' + id).pipe(retry(1), catchError(this.errorHandl));
  }

  deleteAll(): Observable<any> {
    return this.http.delete<any>(this.config.API_Contrat);
  }
}
