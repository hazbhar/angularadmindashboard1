import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/Employe';
import { Site } from 'src/app/models/Site';
import { User } from 'src/app/models/User';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css'],
})
export class UsersProfileComponent implements OnInit {
  employe!: Employe;
  site!: any;
  user!: any;
  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.employe = this.storageService.getUser();
    this.site = this.employe.site;
    this.user = this.employe.user;
    console.log(this.employe);
    console.log(this.site);
    console.log(this.user);
  }
}
