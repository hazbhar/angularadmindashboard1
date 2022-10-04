import {Component, Input, OnInit} from '@angular/core';
import {Employe} from "../../../models/Employe";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeService} from "../../../services/employe.service";


@Component({
  selector: 'app-details-employee',
  templateUrl: './details-employee.component.html',
  styleUrls: ['./details-employee.component.css']
})
export class DetailsEmployeeComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentEmployee: Employe = {
    id:undefined,
    firstName: undefined,
    lastName: undefined,
    initial: undefined,
    dateOfBirth: undefined,
    natioIdCard: undefined,
    availability: undefined,
    companyName: undefined,
    impartialityContract: undefined,
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
    typeOfStaff: undefined
  };
  message = '';
  constructor(private employeeService: EmployeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getEmployee(this.route.snapshot.params["id"]);
    }
  }

  getEmployee(id: string): void {
    this.employeeService.get(id)
      .subscribe({
        next: (data) => {
          this.currentEmployee = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateEmployee(): void {
    this.message = '';

    this.employeeService.update(this.currentEmployee.id, this.currentEmployee)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This user was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteEmployee(): void {
    this.employeeService.delete(this.currentEmployee.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/employee-list']);
        },
        error: (e) => console.error(e)
      });
  }

}
