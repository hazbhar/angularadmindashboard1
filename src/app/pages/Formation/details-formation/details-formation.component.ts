import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
} from '@angular/forms';
import { Employe } from 'src/app/models/Employe';
import { Formation } from 'src/app/models/Formation';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-details-formation',
  templateUrl: './details-formation.component.html',
  styleUrls: ['./details-formation.component.css'],
})
export class DetailsFormationComponent implements OnInit {
  @Input() currentEmployee: Employe;
  addformation = false;

  formations$: Formation[] = [];

  isdeletedfailed = false;
  errorMessage = '';

  formation$:Formation

  constructor(
    private formationService: FormationService,

  ) {}

  async ngOnInit() {
    for (
      let i = 0;
      i < this.currentEmployee['employeeFormationList'].length;
      i++
    ) {
      let id = this.currentEmployee['employeeFormationList'][i];
      await this.getFormations(id['id'], i);
    }
  }


  getFormationById(id: any) {
    console.log('ici');

    this.formationService.get(id).subscribe({
      next: (data: any) => {
        console.log('ici');

        console.log(data);
        this.formation$ = data;
      },
      error: (e: any) => console.error(e),
    });
  }
  async getFormations(id: any, x: any) {
   await this.formationService
      .getByRelationEmpId(id).toPromise()
      .then((data : any) => {
        this.formations$[x] = data;
        console.log(this.formations$[x]);
      })
      .catch((error) => {
        this.isdeletedfailed = true;
          this.errorMessage = error.message;
          console.error(error);
      });

  }

}
