import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../../../services/employe.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Employe } from '../../../models/Employe';
import { User } from '../../../models/User';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  constructor(
    private router: Router,
    private employeeService: EmployeService
  ) {}

  employeeList: Employe[] = [];
  currentIndex = -1;
  username = '';
  currentEmployee: Employe = {
    id: undefined,
    firstName: undefined,
    lastName: undefined,
    initial: undefined,
    dateOfBirth: undefined,
    natioIdCard: undefined,
    availability: undefined,
    companyName: undefined,
    impartialityContract: undefined,
    user: undefined,
    contractList: undefined,
    medicalVisitList: undefined,
    handedOverList: undefined,
    serviceList: undefined,
    processList: undefined,
    site: undefined,
    eapList: undefined,
    employeeFormationList: undefined,
    employeeDiplomaList: undefined,
    employeeAttributionList: undefined,
    civilState: undefined,
    typeOfStaff: undefined,
  };

  ngOnInit(): void {
    this.retrieveEmployees();
  }

  retrieveEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.employeeList = data;
        //console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveEmployees();
    this.currentEmployee = {
      id: undefined,
      firstName: undefined,
      lastName: undefined,
      initial: undefined,
      dateOfBirth: undefined,
      natioIdCard: undefined,
      availability: undefined,
      companyName: undefined,
      impartialityContract: undefined,
      user: undefined,
      contractList: undefined,
      medicalVisitList: undefined,
      handedOverList: undefined,
      serviceList: undefined,
      processList: undefined,
      site: undefined,
      eapList: undefined,
      employeeFormationList: undefined,
      employeeDiplomaList: undefined,
      employeeAttributionList: undefined,
      civilState: undefined,
      typeOfStaff: undefined,
    };
    this.currentIndex;
  }

  setActiveEmployee(employee: Employe, index: number): void {
    this.currentEmployee = employee;
    this.currentIndex = index;
  }
}
