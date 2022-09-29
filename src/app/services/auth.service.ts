import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constant';
import { ILogin } from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  addHttpOption = {
    headers: new HttpHeaders ({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'

    }),
  }

  constructor(private http: HttpClient,private config : Constants) { }

  login(input: ILogin,typeauth:any){
    return this.http.post(
      this.config.API_USER + 'signin?authSelected='+typeauth,
      input,
      this.addHttpOption
    );
  }
}
