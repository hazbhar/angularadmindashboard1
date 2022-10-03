import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Formation } from 'src/app/models/Formation';
import { FormationService } from 'src/app/services/formation.service';


@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.css']
})
export class EditFormationComponent implements OnInit {

  submitted = false ;
  constructor(private formationService : FormationService,private route:ActivatedRoute,private router:Router) { }
  formation: Formation = {
    id:'',
    title : '',
    description : '',
    periodec : true,
    enabled : true,
    visibility : true
  }
  



  ngOnInit(): void {
    this.getFormationById(this.route.snapshot.params["id"])
  }

  formationform = new FormGroup({
    title:new FormControl(),
    description:new FormControl(),
  })


  editFormation(formation:Formation): void {
    console.log("test ")
    //const data = {
      //title: this.formation.title,
      //description: this.formation.description
    //};

    this.formationService.update(formation)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e: any) => console.error(e)
      });
  }

  test(){
    window.alert('teswt')
  }

  getFormationById(id:any){
    this.formationService.get(id).subscribe({
      next:(data: any)=>{
        this.formation=data;
      },error: (e: any) =>console.error(e)
      
    });
  }

}
