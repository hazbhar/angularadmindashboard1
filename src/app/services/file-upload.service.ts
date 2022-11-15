import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservableInput, retry } from 'rxjs';
import { Constants } from '../config/constant';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  addHttpOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }),
  };
  errorHandl: (err: any, caught: Observable<Object>) => ObservableInput<any>;
  constructor(private http: HttpClient, private config: Constants) {}

  // Returns an observable
  /*upload(file:any):Observable<any> {

      // Store form name as "file" with file data

      // Make http post request over api
      // with formData as req
      return this.http.post(this.config.API_UploadFile+"documents", file,this.addHttpOption)

  }*/

  upload(file: FormData): Observable<any> {
    // Create form data

    // Make http post request over api
    // with formData as req
    return this.http.post(this.config.API_UploadFile + 'documents', file).pipe(retry(1), catchError(this.errorHandl));
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.config.API_UploadFile}/files`);
  }
}
