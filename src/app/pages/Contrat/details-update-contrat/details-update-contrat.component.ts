import { Component, Input, OnInit } from '@angular/core';
import { Contract } from 'src/app/models/Contract';
import { Frequence } from 'src/app/models/Frequence';
import { typeContrat } from 'src/app/models/TypeContrat';
import { ContratService } from 'src/app/services/contrat.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FrequenceService } from 'src/app/services/frequence.service';
import { TypecontratService } from 'src/app/services/typecontrat.service';

@Component({
  selector: 'app-details-update-contrat',
  templateUrl: './details-update-contrat.component.html',
  styleUrls: ['./details-update-contrat.component.css']
})
export class DetailsUpdateContratComponent implements OnInit {
  @Input() element: Contract;
  @Input() currentEmployeeid:number;


  typecontrat$!: typeContrat[];

  frequence$!: Frequence[];

  fileToUploadremisemateriel: File[] = [];
  shortLinkremisematerielf$: any = [];

  fileToUploadcontratImpartialite: File;
  fileToUploadcontratConfidentialite: File;
  shortLinkcontratConfidentialite$: any;
  shortLinkcontratImpartialite$: any;

  startDate: any;
  endDate: any;
  typcontid: any;

  isupdatedfailed = false;
  isaddedfailed = false;
  deleted = false;
  isdeletedfailed = false;

  submitted=false;
  errorMessage = '';

  constructor( private typcontratService: TypecontratService,    private contratService: ContratService,    private fileUploadService: FileUploadService ,    private frequenceService: FrequenceService,
    ) {
    this.retrievetypecontrats();
    this.retrievefrequences();
  }

  ngOnInit(): void {
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

  deleteContrat(id: any) {
    this.contratService.delete(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.deleted = true;
      },
      error: (err) => {
        console.log('deleting contrat failed ');
        this.errorMessage = err.error.message;
        this.isdeletedfailed = true;
      },
    });
  }

  handleFileInputfileTocontratImpartialite(event: any) {
    this.fileToUploadcontratImpartialite = <File>event.target.files[0];
  }

  handleFileInputcontratConfidentialite(event: any) {
    this.fileToUploadcontratConfidentialite = <File>event.target.files[0];
  }
  handleFileInputremisemateriel(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.fileToUploadremisemateriel.push(<File>event.target.files[i]);
    }
  }
  async uploadremisematerielf(fil: File[]) {
    console.log('uploadremisematerielf');
    console.log(fil);
    console.log(fil.length);
    for (let f of fil) {
      const formData = new FormData();

      formData.append('document', f);
      await this.fileUploadService
        .upload(formData)
        .toPromise()
        .then((res) => {
          console.log(res);
          this.shortLinkremisematerielf$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.isaddedfailed = true;
        });
    }
  }
  async uploadcontratImpartialite(fil: File) {
    const formData = new FormData();
    formData.append('document', fil);
    await this.fileUploadService
      .upload(formData)
      .toPromise()
      .then((res) => {
        this.shortLinkcontratImpartialite$ = res;
      })
      .catch((error) => {
        this.errorMessage = error.message;
        this.isaddedfailed = true;
      });
  }
  async uploadcontratConfidentialite(fil: File) {
    const formData = new FormData();
    formData.append('document', fil);
    await this.fileUploadService
      .upload(formData)
      .toPromise()
      .then((data) => {
        this.shortLinkcontratConfidentialite$ = data;
      })
      .catch((error) => {
        this.errorMessage = error.message;
        this.isaddedfailed = true;
      });
  }


  resetshortlinks() {
    console.log('reseting short links ');
    this.shortLinkcontratConfidentialite$ = [];
    this.shortLinkcontratImpartialite$ = [];
    this.shortLinkremisematerielf$ = [];

  }

  editContrat(contrat: Contract) {
    console.log(contrat)
    let freqid;
    if (!contrat.frequence) freqid='';
    else  freqid=contrat.frequence.id;
    this.contratService.update(contrat.id,contrat,freqid,this.currentEmployeeid).subscribe({
      next:()=>{
        console.log("updateted")
        this.submitted=true;
      },
      error:(err)=>{
        console.log("updating failed")
        this.isupdatedfailed=true;
      }
    })
  }
}
