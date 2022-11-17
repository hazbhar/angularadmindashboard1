import { Component, Input, OnInit } from '@angular/core';
import { Authentification } from 'src/app/models/Authentification';
import { Privilege } from 'src/app/models/Privilege';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PrivilegeService } from 'src/app/services/privilege.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css'],
})
export class DetailsUserComponent implements OnInit {
@Input() currentEmployee:any

isupdatedfailed = false;
  isaddedfailed = false;
  submitted = false;
  deleted = false;
  isdeletedfailed = false;
  errorMessage = '';
  message = '';

  empuser: User;

  privileges$!: Privilege[];
  role$!: Role[];
  authtypeid$!: Authentification[];

  typeAuth: any;
  authidty:any;

  constructor(
private privilegeService: PrivilegeService,
    private roleService: RoleService,
    private autheService: AuthService,
    private userService: UserService,
  ) {
    this.retrieveroles();
    this.retrievePrivileges();
    this.retrievetypAuth();
  }

  ngOnInit(): void {

    this.empuser = this.currentEmployee.user;

    console.log(this.empuser);
    console.log(this.empuser);

  }

  checkrole(id:any){
    for(let roleuser of this.empuser.roles){
      if (roleuser.id==id)return true
    }
    return false
  }
  checkprev(id:any){
    for(let prevuser of this.empuser.privileges){
      if(prevuser.id==id)return true
    }
    return false
  }

  checkauthtyp(){
    for (let i of this.authtypeid$) {
      if (this.typeAuth == 'ldap') {
        if (i.ldap) {
          this.authidty = i.id;
          return true
        }
      } else {
        if (i.password) {
          this.authidty = i.id;
          return true
        }
      }
    }
    return false
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
    for (let i of this.authtypeid$) {
      if (this.typeAuth == 'ldap') {
        if (i.ldap) {
          this.authidty = i.id;

        }
      } else {
        if (i.password) {
          this.authidty = i.id;

        }
      }
    }
  }

  updateEnability(status: boolean): void {
    const data = {
      username: this.empuser.username,
      password: this.empuser.password,
      enability: status,
    };

    this.message = '';

    this.userService.update(this.empuser.id, data,this.empuser.authentifications.id).subscribe({
      next: (res) => {
        console.log(res);
        this.empuser.enabled = status;
        this.message = res.message
          ? res.message
          : 'The enability was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  updateUser(): void {
    this.message = '';
    console.log(JSON.stringify(this.empuser))
    this.userService.update(this.empuser.id, this.empuser,this.empuser.authentifications.id).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This user was updated successfully!';
          this.submitted=true
      },
      error: (e) =>{ console.error(e);this.isaddedfailed=true},
    });
  }

}
