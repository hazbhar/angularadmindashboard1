import { Component, OnInit } from '@angular/core';
import { Diploma } from 'src/app/models/Diploma';
import { Formation } from 'src/app/models/Formation';
import { DiplomaService } from 'src/app/services/diplome.service';

@Component({
  selector: 'app-list-diplomes',
  templateUrl: './list-diplomes.component.html',
  styleUrls: ['./list-diplomes.component.css']
})
export class ListDiplomesComponent implements OnInit {

  constructor(private diplomaService:  DiplomaService) { }
  diploms?: Diploma[];
  currentdiplom:Diploma;
  deleted=false;
  isdeletedfailed=false;
  errorMessage="";
  currentIndex = -1;
  ngOnInit(): void {
    this.getdiploms();
  }
  getdiploms(): any {
    this.diplomaService.getAll().subscribe(
      (data: any) => {
        this.diploms = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deletediplom(id: any): void {
    // this.formationService.get(1);
    this.diplomaService.delete(id).subscribe({
      next: (res) => {
        this.deleted=true;
        console.log(res);
      },
      error: (e) => {
        this.isdeletedfailed=true;
        this.errorMessage=e.message;
        console.error(e)},
    });
  }
  setActivediplom(diplom: Diploma, index: number): void {
    this.currentdiplom = diplom;
    this.currentIndex = index;
  }
}
