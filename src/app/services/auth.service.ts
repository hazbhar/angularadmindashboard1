import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../config/constant';

@Injectable()
export class AuthService {
  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };

  constructor(private http: HttpClient, private config: Constants) {}

  getAll() {
    return this.http.get<any[]>(this.config.API_AUTH + 'getall',this.addHttpOption);
  }

  login(username: any, password: any, typeauth: any): Observable<any> {
    return this.http.post(
      this.config.API_AUTH + 'signin?authSelected=' + typeauth,
      JSON.stringify({ username, password }),
      this.addHttpOption
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      this.config.API_AUTH + 'signout',
      {},
      this.addHttpOption
    );
  }
}
