import { Component, OnInit } from '@angular/core';
import { Contract } from 'src/app/models/Contract';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Frequence } from 'src/app/models/Frequence';
import { Process } from 'src/app/models/Process';
import { Service } from 'src/app/models/Service';
import { Site } from 'src/app/models/Site';
import { typeContrat } from 'src/app/models/TypeContrat';
import { TypeOfStaff } from 'src/app/models/TypeOfStaff';
import { ContratService } from 'src/app/services/contrat.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FrequenceService } from 'src/app/services/frequence.service';
import { ProcessService } from 'src/app/services/process.service';
import { ServiceService } from 'src/app/services/service.service';
import { SiteService } from 'src/app/services/site.service';
import { TypecontratService } from 'src/app/services/typecontrat.service';
import { TypepersonnelService } from 'src/app/services/typepersonnel.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EmployeService } from 'src/app/services/employe.service';
@Component({
  selector: 'app-edit-contrat',
  templateUrl: './edit-contrat.component.html',
  styleUrls: ['./edit-contrat.component.css']
})
export class EditContratComponent implements OnInit {
  contrat:Contract;
  isupdatedfailed=false;
  isaddedfailed=false;
  submitted=false;
  errorMessage="";
  Infoscontratdutravail!: FormGroup;
  empid:number=0;

    frequence$!: Frequence[];
  site$!: Site[];
  typecontrat$!: typeContrat[];
  typeperso$!: TypeOfStaff[];
  unitetech$!: Service[];
  typprocesus$!: Process[];
  shortLinkeapf$: any;
    /**
   * variables to register from forms to test their values
   */
     typcontid: any;
     siteid: any;
     typePersonnel: any;
     typeProcessus: any;
     freque: any;
     typeAuth: any;

     shortLinkcontratConfidentialite$: any;
     shortLinkcontratImpartialite$: any;

     shortLinkvisiteMedicalesf$: any = [];
     shortLinkremisematerielf$: any = [];

     fileToUploadcontratImpartialite: File;
     fileToUploadcontratConfidentialite: File;
     fileToUploadvisiteMedicales: File[] = [];
     fileToUploadremisemateriel: File[] = [];
     fileToUploadeap: File;
     startDate:any;
     endDate: any;
  employee: any;


  constructor(private typrocesService: ProcessService,
    private unitetechservice: ServiceService,
    private typcontratService: TypecontratService,
    private siteService: SiteService,
    private frequenceService: FrequenceService,
    private fileUploadService: FileUploadService,
    private typepersoService: TypepersonnelService,
    private contratService: ContratService,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private employservice: EmployeService,) { }

  ngOnInit(): void {

    this.retrieveunitetech();
    this.retrievetypprocesus();
    this.retrievetypecontrats();
    this.retrievefrequences();
    this.retrievesites();
    this.retrievetypeperso();
    this.getContratbyid(this.route.snapshot.params['id']);

  }
  retrievesites(): void {
    this.siteService.getAll().subscribe({
      next: (data: any) => {
        this.site$ = data;
        console.log(data);
      },
      error: (e) => console.error(e),
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
  retrievetypeperso(): void {
    this.typepersoService.getAll().subscribe({
      next: (data: any) => {
        this.typeperso$ = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  retrieveunitetech(): void {
    this.unitetechservice.getAll().subscribe({
      next: (data: any) => {
        this.unitetech$ = data;
        console.log(data);
        console.log('unitetech');
      },
      error: (e) => console.error(e),
    });
  }
  retrievetypprocesus(): void {
    this.typrocesService.getAll().subscribe({
      next: (data: any) => {
        this.typprocesus$ = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  get Infoscontrattravail() {
    return this.Infoscontratdutravail.controls;
  }
  get contrats() {
    return this.Infoscontratdutravail.get('contrats') as FormArray;
  }

  handleFileInputfileTocontratImpartialite(event: any) {
    this.fileToUploadcontratImpartialite = <File>event.target.files[0];
  }

  handleFileInputcontratConfidentialite(event: any) {
    this.fileToUploadcontratConfidentialite = <File>event.target.files[0];
  }

  handleFileInputeap(event: any) {
    this.fileToUploadeap = <File>event.target.files[0];
  }
  handleFileInputremisemateriel(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.fileToUploadremisemateriel.push(<File>event.target.files[i]);
    }
  }

  handleFileIvisiteMedicales(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.fileToUploadvisiteMedicales.push(<File>event.target.files[i]);
    }
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

  async uploadvisiteMedicalesf(fil: File[]) {
    console.log('uploadvisiteMedicalesf');
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

          this.shortLinkvisiteMedicalesf$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.isaddedfailed = true;
        });
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
  async uploadeapf(fil: File) {
    const formData = new FormData();
    formData.append('document', fil);
    await this.fileUploadService
      .upload(formData)
      .toPromise()
      .then((res) => {
        this.shortLinkeapf$ = res;
      })
      .catch((error) => {
        this.errorMessage = error.message;
        this.isaddedfailed = true;
      });
  }

  getContratbyid(id:any){
    return this.contratService.get(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.contrat=res;
      },
      error: (e: any) => {
        console.error(e);
        this.errorMessage = e.error.message;
        this.isupdatedfailed = true;
      },
    });
  }
  editContrat( contrat:Contract){}

}
function moment(startDate: Date, arg1: string): any {
  throw new Error('Function not implemented.');
}

