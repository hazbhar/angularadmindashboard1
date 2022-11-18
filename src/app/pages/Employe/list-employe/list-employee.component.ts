import { AfterViewInit,Component, OnInit,ViewChild } from '@angular/core';
import { EmployeService } from '../../../services/employe.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Employe } from '../../../models/Employe';
import { User } from '../../../models/User';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['initial', 'firstName', 'lastName', 'dateOfBirth','Edit','Delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  employeeList: Employe[] = [];
  currentIndex = -1;
  username = '';
  deleted=false;
  isdeletedfailed=false;
  errorMessage="";

  constructor(
    private router: Router,
    private employeeService: EmployeService
  ) {


  }
  ngOnInit(): void {
    this.retrieveEmployees();
    this.ngAfterViewInit();
     // Assign the data to the data source for the table to render
     console.log("this.dataSource")
     console.log(this.dataSource)
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


  retrieveEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.employeeList = data;
        this.dataSource = new MatTableDataSource(data)
        console.log(this.dataSource)
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }


  deleteEmployee(id:any): void {
    this.employeeService.delete(id).subscribe({
      next: (res) => {
        this.deleted=true;
        console.log(res);
      },
      error: (e) => {
        this.isdeletedfailed=true;
        this.errorMessage=e.message;
        console.error(e)},
    });
  }
}
