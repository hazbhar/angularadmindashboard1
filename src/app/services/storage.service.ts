import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const Emp_KEY = 'emp';
const TOKEN_KEY = 'auth-token';
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

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
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
