import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Contract } from 'src/app/models/Contract';
import { Employe } from 'src/app/models/Employe';
import { Frequence } from 'src/app/models/Frequence';
import { typeContrat } from 'src/app/models/TypeContrat';
import { ContratService } from 'src/app/services/contrat.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FrequenceService } from 'src/app/services/frequence.service';
import { TypecontratService } from 'src/app/services/typecontrat.service';

@Component({
  selector: 'app-details-contrat',
  templateUrl: './details-contrat.component.html',
  styleUrls: ['./details-contrat.component.css']
})
export class DetailsContratComponent implements OnInit {
@Input() currentEmployee:Employe;

contrat: Contract;
typecontrat$!: typeContrat[];
contras$: any[] = [];
frequence$!: Frequence[];

isupdatedfailed = false;
addcontrat=false;
errorMessage = '';

  constructor(    private typcontratService: TypecontratService,    private contratService: ContratService,    private frequenceService: FrequenceService, ) {
      this.retrievetypecontrats();
      this.retrievefrequences();

    }

    async ngOnInit() {

    for (let i = 0; i < this.currentEmployee['contractList'].length; i++) {
      let id = this.currentEmployee['contractList'][i];
      this.getContratss(id['id'], i);
    }
  }
  getContratbyid(id: any) {
    return this.contratService.get(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.contrat = res;
      },
      error: (e: any) => {
        console.error(e);
        this.errorMessage = e.error.message;
        this.isupdatedfailed = true;
      },
    });
  }


  retrievefrequences(): void {
    this.frequenceService.getAll().subscribe({
      next: (data: any) => {
        this.frequence$ = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  retrievetypecontrats(): void {
    this.typcontratService.getAll().subscribe({
      next: (data: any) => {
        this.typecontrat$ = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  async getContratss(id: any, x: any) {
    this.contratService.get(id).subscribe((data: {}) => {
      this.contras$[x] = data;

      console.log(this.contras$[x]);
    });
  }


}
