import { FormationService } from './../../../services/formation.service';
import { Formation } from './../../../models/Formation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formations.component.html',
  styleUrls: ['./list-formations.component.css']
})
export class ListFormationsComponent implements OnInit {

  formations? : Formation[];
  formation: Formation = {
    id:'',
    title : '',
    description : '',
    periodec : true,
    enabled : true,
    visibility : true
  }



  constructor(private formationService : FormationService) { }

  ngOnInit(): void {
    this.getFormations();
  }

  getFormations(): any {
    this.formationService.getAll().subscribe((data: any)=>
    {this.formations=data},
    (error:any)=>{ console.log(error)}
      
      );
  }

  deleteFormation(formation:Formation): void {
    // this.formationService.get(1);
     this.formationService.delete(formation.id).subscribe(
       (data)=>{
        window.location.reload();
       },
       (err)=>{console.log(err)}
     ) ;
   }

}
