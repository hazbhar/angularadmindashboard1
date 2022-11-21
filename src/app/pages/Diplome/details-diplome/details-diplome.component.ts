import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Diploma } from 'src/app/models/Diploma';
import { Employe } from 'src/app/models/Employe';
import { DiplomaService } from 'src/app/services/diplome.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-details-diplome',
  templateUrl: './details-diplome.component.html',
  styleUrls: ['./details-diplome.component.css'],
})
export class DetailsDiplomeComponent implements OnInit {
  @Input() currentEmployee: Employe;

  diploma: any;
  diplome: Diploma;

  adddimplome = false;

  diploms$: any[] = [];

  constructor(
    private diplomeService: DiplomaService,
  ) {}

  async ngOnInit() {
    for (
      let i = 0;
      i < this.currentEmployee['employeeDiplomaList'].length;
      i++
    ) {
      let id = this.currentEmployee['employeeDiplomaList'][i];
      await this.getdiplomss(id['id'], i);
    }
  }
  async getDiplomeById(id: any, i: any) {
    this.diplomeService
      .get(id)
      .toPromise()
      .then((data: any) => {
        this.diplome = data;
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  async getdiplomss(id: any, x: any): Promise<any> {
    await this.diplomeService.getByRelationEmpId(id).subscribe((data: {}) => {
      this.diploms$[x] = data;
      console.log(this.diploms$[x]);
    });
  }


}
