import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users?: User[];
  currentUser: User = {
    id:undefined,
    username: undefined,
    password: undefined,
    confPassword: undefined,
    email: undefined,
    confEmail:undefined,
    lastconnection: undefined,
    validity: undefined,
    enabled: undefined,
    authentifications:undefined,
    employee:undefined,
    roles: undefined,
    privileges:undefined
  };
  currentIndex = -1;
  username = '';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }
  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          //console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {
      id:undefined,
      username: undefined,
      password: undefined,
      confPassword: undefined,
      email: undefined,
      confEmail:undefined,
      lastconnection: undefined,
      validity: undefined,
      enabled: undefined,
      authentifications:undefined,
      employee:undefined,
      roles: undefined,
      privileges:undefined
    };
    this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }
}
