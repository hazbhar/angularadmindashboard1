import { Component, OnInit } from '@angular/core';
import { Contract } from 'src/app/models/Contract';
import { ContratService } from 'src/app/services/contrat.service';

@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat.component.css']
})
export class ListContratComponent implements OnInit {
  contratList:Contract[] = [];
  currentContrat:Contract;
  deleted=false;
  isdeletedfailed=false;
  errorMessage="";
  currentIndex = -1;
  constructor(private contratService: ContratService) { }

  ngOnInit(): void {
    this.getcontrats();
  }
  getcontrats(): any {
    this.contratService.getAll().subscribe(
      (data: any) => {
        this.contratList = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deletecontrat(id: any): void {
    // this.formationService.get(1);
    this.contratService.delete(id).subscribe({
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
  setActivecontrat(contrat: Contract, index: number): void {
    this.currentContrat = contrat;
    this.currentIndex = index;
  }
}
