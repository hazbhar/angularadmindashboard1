import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  errorMessage = '';
  isaddedfailed=false;

  user: User = {
    username: undefined,
    password: undefined,
    email: undefined,
    id: undefined,
    lastconnection: undefined,
    validity: false,
    visibility: false,
    enabled: false,
    role : undefined
  };

  submitted = false;

  constructor(private userservice: UserService, private storageService: StorageService) { }

  ngOnInit(): void {
  }
  saveUser(): void {
    const curentuser = this.storageService.getUser();

    this.userservice.create(curentuser.id,this.user)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: err => {
          console.log(this.user);
          console.log("adding failed ");
          this.errorMessage = err.error.message;
          this.isaddedfailed = true;

        }
      });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
    username: undefined,
    password: undefined,
    email: undefined,
    id: undefined,
    lastconnection: undefined,
    validity: undefined,
    visibility: undefined,
    enabled: undefined

    };
    this.isaddedfailed=false;
    this.errorMessage='';
  }
}
