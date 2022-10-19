import { Component, OnInit } from '@angular/core';

import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

import { Role } from '../../../models/Role';
import { Privilege } from '../../../models/Privilege';
import { PrivilegeService } from 'src/app/services/privilege.service';
import { RoleService } from 'src/app/services/role.service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Authentification } from 'src/app/models/Authentification';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  errorMessage = '';
  isaddedfailed = false;
  privileges$!: Privilege[];
  role$!:Role[];
  user:User;
  typeAuth: any;
  authtypeid$!: Authentification[];

  submitted = false;
  Infosdesecurite!: FormGroup;

  constructor(

    private formBuilder: FormBuilder,
    private userservice: UserService,
    private storageService: StorageService,
    private privilegeService: PrivilegeService,
    private roleService: RoleService,
    private autheService: AuthService

  ) {}

  ngOnInit(): void {
    this.retrieveroles();
    this.retrievePrivileges();
    this.retrievetypAuth();

    this.Infosdesecurite = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      confirmEmail: new FormControl('', Validators.required),
      typeAuth: new FormControl('', Validators.required),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      role: new FormControl('', Validators.required),
      privilege: new FormControl('', Validators.required),
    });
  }

  saveUser(): void {
    let authidty;

    const curentuser = this.storageService.getUser();
    for (let i of this.authtypeid$) {
      if (this.typeAuth == 'ldap') {
        if (i.ldap) {
          authidty = i.id;
        }
      } else {
        if (i.password) {
          authidty = i.id;
        }
      }
    }
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
    this.user = new User();
  }
  retrieveroles(): void {
    this.roleService.getAll().subscribe({
      next: (data: any) => {
        this.role$ = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  retrievePrivileges(): void {
    this.privilegeService.getAll().subscribe({
      next: (data: any) => {
        this.privileges$ = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  retrievetypAuth(): void {
    this.autheService.getAll().subscribe({
      next: (data: any) => {
        this.authtypeid$ = data;
        console.log('auth');
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  onChange(e: any) {
    this.typeAuth = e.target.value;
  }
}
