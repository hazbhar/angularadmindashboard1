
import { Component, OnInit } from '@angular/core';

import {Diploma} from "../../../models/Diploma";
import {DiplomaService} from "../../../services/diplome.service";

@Component({
  selector: 'app-add-diplome',
  templateUrl: './add-diplome.component.html',
  styleUrls: ['./add-diplome.component.css']
})
export class AddDiplomeComponent implements OnInit {

  diplome: Diploma;

  submitted = false ;
  constructor(private diplomeService : DiplomaService) { }

    ngOnInit(): void {
    }

    addDiplome(): void {
      const data = {
        title: this.diplome.title,
        speciality: this.diplome.speciality,
        dateObtained: this.diplome.dateObtained
      };

      this.diplomeService.create(data,1)
        .subscribe({
          next: (res: any) => {
            //To do (remove data displayed in console)
            console.log(res);
            this.submitted = true;
          },
          error: (e: any) => console.error(e)
        });
    }
}
