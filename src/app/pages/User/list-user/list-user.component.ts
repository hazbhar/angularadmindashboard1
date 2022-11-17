import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = ['username', 'email','Edit','Delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  users?: User[];
  currentUser: User
  deleted=false;
  isdeletedfailed=false;
  errorMessage="";
  currentIndex = -1;
  username = '';
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveUsers();
    this.ngAfterViewInit();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  retrieveUsers(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.dataSource = new MatTableDataSource(data)
        console.log(this.dataSource)
        //console.log(data);
      },
      error: (e) => console.error(e),
    });
  }


  deleteUser(id: any) {
    if(confirm("Are you sure to delete ")) {
    this.userService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.deleted = true;
        this.isdeletedfailed=false;
        this.retrieveUsers();
        this.ngAfterViewInit();
      },
      error: (e) => {
        console.error(e),
        this.errorMessage=e.message;
        this.isdeletedfailed=true;
        this.deleted=false;
      }
    });
  }
  }
  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }
}
