import { Diplome } from './../../../models/Diplome';
import { Component, OnInit } from '@angular/core';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-add-diplome',
  templateUrl: './add-diplome.component.html',
  styleUrls: ['./add-diplome.component.css']
})
export class AddDiplomeComponent implements OnInit {

  formation: Diplome = {
    title : '',
    speciality : '',
    mention : '',
    geted : true,
    dateObtained : undefined
  }

  submitted = false ;
  constructor(private formationService : FormationService) { }

    ngOnInit(): void {
    }

    addFormation(): void {
      const data = {
        title: this.formation.title,
        description: this.formation.speciality
      };

      this.formationService.create(data,1)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.submitted = true;
          },
          error: (e: any) => console.error(e)
        });
    }
}
