import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  loginform!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  submitted = false;
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
    this.loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  postLoginForm() {
    this.submitted=true
    if (this.username==undefined|| this.username==""){this.errorMessage = "username and password are required";}
    else if( this.password==undefined||this.password==""){this.errorMessage = "username and password are required";}else{
      this.authService.login(this.username, this.password, 'password').subscribe({
        next: (apiReponse) => {
          this.submitted = true;
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
          console.log(err.error);
          this.isLoginFailed = true;
        },
      });
    }

  }
}
