import { FormationService } from './../../../services/formation.service';
import { Formation } from './../../../models/Formation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formations.component.html',
  styleUrls: ['./list-formations.component.css'],
})
export class ListFormationsComponent implements OnInit {
  formations?: Formation[];
  currentformation: Formation = {
    id: 0,
    title: undefined,
    description: undefined,
    periodec: undefined,
    enabled: undefined,
    employeeFormationList: undefined,
    habilitationList: undefined,
    attachedDocsList: undefined,
  };

  deleted=false;
  isdeletedfailed=false;
  errorMessage="";
  currentIndex = -1;
  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.getFormations();
  }

  getFormations(): any {
    this.formationService.getAll().subscribe(
      (data: any) => {
        this.formations = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deleteFormation(id: number): void {
    // this.formationService.get(1);
    this.formationService.delete(id).subscribe({
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
  setActiveForma(formation: Formation, index: number): void {
    this.currentformation = formation;
    this.currentIndex = index;
  }
}
