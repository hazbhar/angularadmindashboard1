import { Injectable } from '@angular/core';
import { Attribution } from '../models/Attribution';
import { Contract } from '../models/Contract';
import { Diploma } from '../models/Diploma';
import { Formation } from '../models/Formation';
const USER_KEY = 'auth-user';
const Emp_KEY = 'emp';


@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  clean(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }
  cleanlocal(): void {
    window.localStorage.clear();
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  public saveEmp(emp: any): void {
    window.localStorage.removeItem(Emp_KEY);
    window.localStorage.setItem(Emp_KEY, JSON.stringify(emp));
  }

  public getEmp(): any {
    const emp = window.localStorage.getItem(Emp_KEY);
    if (emp) {
      return JSON.parse(emp);
    }

    return {};
  }




}
