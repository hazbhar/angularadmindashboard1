import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import {Diploma} from "../../../models/Diploma";
import {DiplomaService} from "../../../services/diplome.service";

@Component({
  selector: 'app-edit-diplome',
  templateUrl: './edit-diplome.component.html',
  styleUrls: ['./edit-diplome.component.css']
})
export class EditDiplomeComponent implements OnInit {

  ubmitted = false ;
  constructor(private diplomeService : DiplomaService,private route:ActivatedRoute,private router:Router) { }
  diplome: Diploma;




  ngOnInit(): void {
    this.getDiplomeById(this.route.snapshot.params["id"])
  }

  diplomeform = new FormGroup({
    title:new FormControl(),
    description:new FormControl(),
  })


  editDiplome(diplome:Diploma): void {

    // romove displayed data in console & add id
    console.log("test ")
    this.diplomeService.update(diplome.id,diplome)
      .subscribe({
        next: (res: any) => {
          console.log(res);

        },
        error: (e: any) => console.error(e)
      });
  }

  test(){
    window.alert('teswt')
  }

  getDiplomeById(id:any){
    this.diplomeService.get(id).subscribe({
      next:(data: any)=>{
        this.diplome=data;
      },error: (e: any) =>console.error(e)

    });
  }
}
