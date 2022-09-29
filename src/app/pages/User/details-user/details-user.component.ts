import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentUser: User = {
    username: undefined,
    password: undefined,
    email: undefined,
    id: undefined,
    lastconnection: undefined,
    validity: undefined,
    visibility: undefined,
    enabled: undefined
  };
  message = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
    }
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateValidity(status: boolean): void {
    const data = {

      username: this.currentUser.username,
      password: this.currentUser.password,
      validity: status,

    };

    this.message = '';

    this.userService.update(this.currentUser.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentUser.validity = status;
          this.message = res.message ? res.message : 'The validity was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateVisibility(status: boolean): void {
    const data = {
      username: this.currentUser.username,
      password: this.currentUser.password,
      visibility: status
    };

    this.message = '';

    this.userService.update(this.currentUser.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentUser.visibility = status;
          this.message = res.message ? res.message : 'The visibility was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateEnability(status: boolean): void {
    const data = {
      username: this.currentUser.username,
      password: this.currentUser.password,
      enability: status
    };

    this.message = '';

    this.userService.update(this.currentUser.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentUser.enabled = status;
          this.message = res.message ? res.message : 'The enability was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateUser(): void {
    this.message = '';

    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This user was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/listusers']);
        },
        error: (e) => console.error(e)
      });
  }

}