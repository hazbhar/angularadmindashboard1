import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Authentification } from 'src/app/models/Authentification';
import { Privilege } from 'src/app/models/Privilege';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PrivilegeService } from 'src/app/services/privilege.service';
import { RoleService } from 'src/app/services/role.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentUser: User ;
  errorMessage = '';
  isaddedfailed = false;
  privileges$!: Privilege[];
  role$!:Role[];
  user:User;
  typeAuth: any;
  authtypeid$!: Authentification[];
  message = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userservice: UserService,
    private storageService: StorageService,
    private privilegeService: PrivilegeService,
    private roleService: RoleService,
    private autheService: AuthService
  ) {}

  ngOnInit(): void {

      this.getUser(this.route.snapshot.params['id']);
      this.retrieveroles();
      this.retrievePrivileges();
      this.retrievetypAuth();

  }

  getUser(id: string): void {
    this.userService.get(id).subscribe({
      next: (data) => {
        this.currentUser = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updateValidity(status: boolean): void {
    const data = {
      username: this.currentUser.username,
      password: this.currentUser.password,
      validity: status,
    };

    this.message = '';

    this.userService.update(this.currentUser.id, data,this.currentUser.authentifications.id).subscribe({
      next: (res) => {
        console.log(res);
        this.currentUser.validity = status;
        this.message = res.message
          ? res.message
          : 'The validity was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  updateVisibility(status: boolean): void {
    const data = {
      username: this.currentUser.username,
      password: this.currentUser.password,
      visibility: status,
    };

    this.message = '';

    this.userService.update(this.currentUser.id, data,this.currentUser.authentifications.id).subscribe({
      next: (res) => {
        console.log(res);
        //this.currentUser.visibility = status;
        this.message = res.message
          ? res.message
          : 'The visibility was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  updateEnability(status: boolean): void {
    const data = {
      username: this.currentUser.username,
      password: this.currentUser.password,
      enability: status,
    };

    this.message = '';

    this.userService.update(this.currentUser.id, data,this.currentUser.authentifications.id).subscribe({
      next: (res) => {
        console.log(res);
        this.currentUser.enabled = status;
        this.message = res.message
          ? res.message
          : 'The enability was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  updateUser(): void {
    this.message = '';

    this.userService.update(this.currentUser.id, this.currentUser,this.currentUser.authentifications.id).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This user was updated successfully!';
      },
      error: (e) => console.error(e),
    });
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
