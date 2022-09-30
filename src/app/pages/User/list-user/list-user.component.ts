import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    username: undefined,
    password: undefined,
    email: undefined,
    id: undefined,
    lastconnection: undefined,
    validity: undefined,
    visibility: undefined,
    enabled: undefined
  };
  currentIndex = -1;
  username = '';
  constructor(private userService: UserService,private router: Router) { }

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
      username: undefined,
    password: undefined,
    email: undefined,
    id: undefined,
    lastconnection: undefined,
    validity: undefined,
    visibility: undefined,
    enabled: undefined
    };
    this.currentIndex = -1;
  }
  deleteUser(id:any): void {
    this.userService.delete(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/listusers']);
        },
        error: (e) => console.error(e)
      });
  }
  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }
}
