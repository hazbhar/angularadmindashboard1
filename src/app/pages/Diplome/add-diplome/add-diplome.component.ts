import { Diplome } from './../../../models/Diplome';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-diplome',
  templateUrl: './add-diplome.component.html',
  styleUrls: ['./add-diplome.component.css']
})
export class AddDiplomeComponent implements OnInit {

  formation: Diplome = {
    title : '',
    description : '',
    periodec : true,
    enabled : true,
    visibility : true
  }
  
  submitted = false ;
  constructor(private formationService : FormationService) { }
  
    ngOnInit(): void {
    }
  
    addFormation(): void {
      const data = {
        title: this.formation.title,
        description: this.formation.description
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
