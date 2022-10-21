import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient, private config: Constants) {}

  getAll() {
    return this.http.get<Contract[]>(this.config.API_Contrat + 'getall');
  }

  get(id: any): Observable<Contract> {
    return this.http.get<Contract>(this.config.API_Contrat +"getContract?id="+ id,this.addHttpOption);
  }

  create(employeeId: any,contractTypeId: any,frequenceId: any, data: any): Observable<any> {

    return this.http.post(this.config.API_Contrat + 'add?frequenceId=', frequenceId+'&contractTypeId='+contractTypeId+'&employeeId='+employeeId,data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.config.API_Contrat}/{id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.config.API_Contrat + 'delete?id=' + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.config.API_Contrat);
  }
}
