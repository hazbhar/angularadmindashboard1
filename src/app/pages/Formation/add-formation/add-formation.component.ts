import { FormationService } from 'src/app/services/formation.service';
import { Formation } from 'src/app/models/Formation';
import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit {


 formation: Formation = {
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
