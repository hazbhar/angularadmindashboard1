import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { Authentification } from '../../../models/Authentification';
import { Employe } from '../../../models/Employe';
import { Role } from '../../../models/Role';
import { Privilege } from '../../../models/Privilege';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  errorMessage = '';
  isaddedfailed = false;

  user: User = {
    id: undefined,
    username: undefined,
    password: undefined,
    confPassword: undefined,
    email: undefined,
    confEmail: undefined,
    lastconnection: undefined,
    validity: undefined,
    enabled: undefined,
    authentifications: undefined,
    employee: undefined,
    roles: undefined,
    privileges: undefined,
  };

  submitted = false;

  constructor(
    private userservice: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}
  saveUser(): void {
    const curentuser = this.storageService.getUser();

    this.userservice.create(curentuser.id, this.user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.submitted = true;
      },
      error: (err) => {
        console.log(this.user);
        console.log('adding failed ');
        this.errorMessage = err.error.message;
        this.isaddedfailed = true;
      },
    });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      id: undefined,
      username: undefined,
      password: undefined,
      confPassword: undefined,
      email: undefined,
      confEmail: undefined,
      lastconnection: undefined,
      validity: undefined,
      enabled: undefined,
      authentifications: undefined,
      employee: undefined,
      roles: undefined,
      privileges: undefined,
    };
    this.isaddedfailed = false;
    this.errorMessage = '';
  }
}
