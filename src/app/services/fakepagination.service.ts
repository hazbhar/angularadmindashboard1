import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakepaginationService {

  constructor(private http: HttpClient) { }

  get(pag:any){
    return this.http.get("https://reqres.in/api/users?page="+pag);
  }
}
