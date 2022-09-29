import {Component, OnInit} from '@angular/core';
import {EmployeService} from "../../../services/employe.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";


@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  constructor(private router: Router, private employeeService: EmployeService) {
  }

  employeeList: any[] = [];
  dtTrigger: Subject<any>= new Subject();
  parsedJson: any;
  stringifiedData: any;

  ngOnInit(): void {

    this.employeeService.getAll().subscribe(
      (data)=>{
        console.log("test 1 ",data)
      },
      (error)=>{
        console.log("test 2 ",error)
      }
    );;
  }

}
