import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ILogin } from 'src/app/models/login.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {

  constructor(private authService:AuthService) { }

    loginInput:ILogin={userName:'',password:''}

  ngOnInit(): void {
  }

  postLoginForm(){
    this.authService.login(this.loginInput.userName,this.loginInput.password,'password').subscribe({
      next: apiReponse => {
        console.log()
        console.warn(apiReponse);
  }})
}
}
