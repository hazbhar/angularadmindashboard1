import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Employe } from 'src/app/models/Employe';
import { Frequence } from 'src/app/models/Frequence';
import { typeContrat } from 'src/app/models/TypeContrat';
import { ContratService } from 'src/app/services/contrat.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FrequenceService } from 'src/app/services/frequence.service';
import { TypecontratService } from 'src/app/services/typecontrat.service';

@Component({
  selector: 'app-deatils-add-contrat',
  templateUrl: './deatils-add-contrat.component.html',
  styleUrls: ['./deatils-add-contrat.component.css']
})
export class DeatilsAddContratComponent implements OnInit {
  @Input() currentEmployeeid:Employe;

  Infoscontratdutravail!: FormGroup;

  frequence$!: Frequence[];
fileToUploadremisemateriel: File[] = [];
shortLinkremisematerielf$: any = [];
typecontrat$!: typeContrat[];

fileToUploadcontratImpartialite: File;
fileToUploadcontratConfidentialite: File;
shortLinkcontratConfidentialite$: any;
shortLinkcontratImpartialite$: any;
fileisaddedfailed=false
isaddedfailed = false;
submitted = false;


nomSociete:any;
availability:any;
startdate:any;
endate:any;
frequ='';

errorMessage = '';
typcont:any;
  constructor(private typcontratService: TypecontratService,    private contratService: ContratService,    private fileUploadService: FileUploadService ,    private frequenceService: FrequenceService,
    private formBuilder: FormBuilder) {
    this.retrievetypecontrats();
    this.retrievefrequences();

    this.Infoscontratdutravail = this.formBuilder.group({
      dateDeb: new FormControl('', Validators.required),
      typcont: new FormControl('', Validators.required),
      datefin: new FormControl(''),
      frequence: new FormControl(''),
      contratImpartialite: new FormControl('', Validators.required),
      contratConfidentialite: new FormControl('', Validators.required),
      remisemateriel: new FormControl('', Validators.required),
    });

  }

  ngOnInit(): void {


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
          this.fileisaddedfailed = true;
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
        this.fileisaddedfailed = true;
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
        this.fileisaddedfailed = true;
      });
  }


  resetshortlinks() {
    console.log('reseting short links ');
    this.shortLinkcontratConfidentialite$ = [];
    this.shortLinkcontratImpartialite$ = [];
    this.shortLinkremisematerielf$ = [];

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
  async addContrat(){
   await this.uploadremisematerielf(this.fileToUploadremisemateriel);
   await  this.uploadcontratConfidentialite(this.fileToUploadcontratConfidentialite);
   await this.uploadcontratImpartialite(this.fileToUploadcontratImpartialite);
   const contrat= {
        companyName: this.nomSociete,
        availability: Boolean(this.availability),
        impartialityContract: this.shortLinkcontratImpartialite$,
        privacyContract: this.shortLinkcontratConfidentialite$,

            startDate: this.startdate,
            endDate: this.endate,




        handedOverList: [
          {
            attachedDocs: this.shortLinkremisematerielf$,
          },
        ],



      }
      console.log(contrat)
    this.contratService.create(this.currentEmployeeid,Number(this.typcont),this.frequ,contrat).subscribe({
      next: (res: any) => {
        console.log(res);
        this.submitted = true;
      },
      error: (err) => {
        console.log('adding Contrat failed ');
        this.errorMessage = err.error.message;
        this.isaddedfailed = true;
      },
    });
  }
}
