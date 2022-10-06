import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ILogin } from 'src/app/models/login.interface';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoginRequest } from '../../models/LoginRequest';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css'],
})
export class PagesLoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}
  username!: any;
  password!: any;

  isLoggedIn = false;
  isLoginFailed = true;
  errorMessage = '';
  roles: string[] = [];
  loginInput: LoginRequest;

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  postLoginForm() {
    this.authService.login(this.username, this.password, 'password').subscribe({
      next: (apiReponse) => {
        console.log('authh');
        console.warn(apiReponse);
        this.storageService.saveUser(apiReponse);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        console.log('authh fnsh');
        //this.router.navigate
        window.location.reload();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
}
