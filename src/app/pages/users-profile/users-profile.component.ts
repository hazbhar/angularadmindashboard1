import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/Employe';
import { Site } from 'src/app/models/Site';
import { User } from 'src/app/models/User';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css'],
})
export class UsersProfileComponent implements OnInit {
  employe!: Employe;
  site!: any;
  user!: any;

  oldpassword:any;
  newpassword:any;
  confnewpass:any

  updatePass=false;
  faildupdatpass=false;

  constructor(private storageService: StorageService,private userService:UserService) {}

  ngOnInit(): void {
    this.employe = this.storageService.getUser();
    this.site = this.employe.site;
    this.user = this.employe.user;
    console.log(this.employe);
    console.log(this.site);
    console.log(this.user);
  }

  updatePassword(){
    this.userService.updatePass(this.user.id,this.oldpassword,this.newpassword,this.confnewpass).subscribe({
      next:(res)=>{
        console.log(res);
        this.updatePass=true;
      },
      error:(err) =>{
        console.log(err);
        this.faildupdatpass=true;
      },
    })
  }
}
