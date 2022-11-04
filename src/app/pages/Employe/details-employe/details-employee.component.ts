import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Employe } from '../../../models/Employe';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../../../services/employe.service';
import { DatePipe } from '@angular/common';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Authentification } from 'src/app/models/Authentification';
import { CivilState } from 'src/app/models/CivilState';
import { Frequence } from 'src/app/models/Frequence';
import { Privilege } from 'src/app/models/Privilege';
import { Process } from 'src/app/models/Process';
import { Role } from 'src/app/models/Role';
import { Service } from 'src/app/models/Service';
import { Site } from 'src/app/models/Site';
import { typeContrat } from 'src/app/models/TypeContrat';
import { TypeOfStaff } from 'src/app/models/TypeOfStaff';
import { AuthService } from 'src/app/services/auth.service';
import { EtatcivilService } from 'src/app/services/etatcivil.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FrequenceService } from 'src/app/services/frequence.service';
import { PrivilegeService } from 'src/app/services/privilege.service';
import { ProcessService } from 'src/app/services/process.service';
import { RoleService } from 'src/app/services/role.service';
import { ServiceService } from 'src/app/services/service.service';
import { SiteService } from 'src/app/services/site.service';
import { StorageService } from 'src/app/services/storage.service';
import { TypecontratService } from 'src/app/services/typecontrat.service';
import { TypepersonnelService } from 'src/app/services/typepersonnel.service';
import { UserService } from 'src/app/services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatToolbar } from '@angular/material/toolbar';
import { ContratService } from 'src/app/services/contrat.service';
import { Contract } from 'src/app/models/Contract';
import { DiplomaService } from 'src/app/services/diplome.service';
import { Diploma } from 'src/app/models/Diploma';
import { FormationService } from 'src/app/services/formation.service';
import { Formation } from 'src/app/models/Formation';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AttributionService } from 'src/app/services/attribution.service';
import { MedicalVisiteService } from 'src/app/services/medical-visite.service';
import { EapService } from 'src/app/services/eap.service';

animations: [
  trigger('detailExpand', [
  state('collapsed', style({height: '0px', minHeight: '0'})),
  state('expanded', style({height: '*'})),
  transition('expanded <=> collapsed', animate('225ms cubicbezier(0.4, 0.0, 0.2, 1)')),
  ]),
]
@Component({
  selector: 'app-details-employee',
  templateUrl: './details-employee.component.html',
  styleUrls: ['./details-employee.component.css'],
})
export class DetailsEmployeeComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  toolbar!: MatToolbar;
  isChecked = true;
  title = 'angularcrud';
  currentEmployee: any;
  page: any = 'Info';
  diploma: any;
  contrat: Contract;
  isupdatedfailed = false;
  isaddedfailed = false;
  submitted = false;
  deleted = false;
  isdeletedfailed = false;
  errorMessage = '';
  Infoscontratdutravail!: FormGroup;
  empid: number = 0;
  diplome: Diploma;
  periodiq: boolean = false;

  etatcivil$!: CivilState[];
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
  startDate: any;
  endDate: any;
  employee: any;
  formation: Formation;

  fileToUploadAttributionf: File[] = [];
  fileToUploaddiplomefile: File[] = [];

  shortLinkdiplomefile$: any = [];
  shortLinkAttributionf$: any = [];

  fileToUploadformationFile: File[] = [];
  fileToUploadhabilitationFile: File[] = [];

  shortLinkhabilitationFile$: any = [];
  shortLinkformationFile$: any = [];
  formations: any[]=[];
  diploms: any[]=[];
  contras: any[]=[];
  Attributions:any[]=[];
  medicalvisit:any[]=[];
  eaplist:any[]=[];
  constructor(
    private fb: FormBuilder,
    private observer: BreakpointObserver,
    private employeeService: EmployeService,
    private typrocesService: ProcessService,
    private unitetechservice: ServiceService,
    private typcontratService: TypecontratService,
    private siteService: SiteService,
    private frequenceService: FrequenceService,
    private fileUploadService: FileUploadService,
    private typepersoService: TypepersonnelService,
    private contratService: ContratService,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private diplomeService: DiplomaService,
    private formationService: FormationService,
    private etatcivilService: EtatcivilService,
    private attributionService:AttributionService,
    private medicalVisiteService:MedicalVisiteService,
    private eapService:EapService

  ) {}

  ngOnInit(): void {
    this.retrieveunitetech();
    this.retrievetypprocesus();
    this.retrievetypecontrats();
    this.retrievefrequences();
    this.retrievesites();
    this.retrievetypeperso();
    this.retrieveetacivil();
    this.getEmployee(this.route.snapshot.params['id']);
    this.sidenav.open();
  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  getEmployee(id: string): void {
    this.employeeService.get(id).subscribe({
      next: (data) => {
        this.currentEmployee = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  openPage(pg: any) {
    this.page = pg;

    if(pg=='Formations'){
    for(let i=0;i<this.currentEmployee['employeeFormationList'].length;i++){
      console.log("this.currentFormation");
      console.log(this.currentEmployee['employeeFormationList'].length);
      console.log("yoooo")
      console.log(this.currentEmployee['employeeFormationList'][i])
      let id=this.currentEmployee['employeeFormationList'][i]
      this.getFormations(id['id'],i)}
    }
    if(pg=='Diploms'){
      for(let i=0;i<this.currentEmployee['employeeDiplomaList'].length;i++){
        console.log("this.employeeDiplomaList");
        console.log(this.currentEmployee['employeeDiplomaList'].length);
        console.log("yoooo")
        console.log(this.currentEmployee['employeeDiplomaList'][i])
        let id=this.currentEmployee['employeeDiplomaList'][i]
        this.getdiplomss(id['id'],i)}
      }
      if(pg=='Contrats'){
        for(let i=0;i<this.currentEmployee['contractList'].length;i++){
          console.log("this.contractList");
          console.log(this.currentEmployee['contractList'].length);
          console.log("yoooo")
          console.log(this.currentEmployee['contractList'][i])
          let id=this.currentEmployee['contractList'][i]
          this.getContratss(id['id'],i)}
        }
        if(pg=='Attribution'){
          for(let i=0;i<this.currentEmployee['employeeAttributionList'].length;i++){
            console.log("this.employeeAttributionList");
            console.log(this.currentEmployee['employeeAttributionList'].length);
            console.log("yoooo")
            console.log(this.currentEmployee['employeeAttributionList'][i])
            let id=this.currentEmployee['employeeAttributionList'][i]
            this.getAttributions(id['id'],i)}
          }
          if(pg=='VisitMedical'){
            for(let i=0;i<this.currentEmployee['medicalVisitList'].length;i++){
              console.log("this.medicalVisitList");
              console.log(this.currentEmployee['medicalVisitList'].length);
              console.log("yoooo")
              console.log(this.currentEmployee['medicalVisitList'][i])
              let id=this.currentEmployee['medicalVisitList'][i]
              this.getMedicalvisits(id['id'],i)}
            }
            if(pg=='Eap'){
              for(let i=0;i<this.currentEmployee['eapList'].length;i++){
                console.log("this.eapList");
                console.log(this.currentEmployee['eapList'].length);
                console.log("yoooo")
                console.log(this.currentEmployee['eapList'][i])
                let id=this.currentEmployee['eapList'][i]
                this.getEaps(id['id'],i)}
              }
    console.log(this.page);
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
  retrieveetacivil(): void {
    this.etatcivilService.getAll().subscribe({
      next: (data: any) => {
        this.etatcivil$ = data;
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
  editContrat(contrat: Contract) {}

  updatediplom(): void {
    // romove displayed data in console & add id
    console.log('test ');
    this.diplomeService.update(this.diplome.id, this.diplome).subscribe({
      next: (res: any) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e: any) => {
        console.error(e);
        this.errorMessage = e.error.message;
        this.isupdatedfailed = true;
      },
    });
  }
  async getDiplomeById(id: any,i:any) {
    this.diplomeService
      .get(id)
      .toPromise()
      .then((data: any) => {
        this.diplome = data;
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleFileInputdiplomefile(event: any) {
    this.fileToUploaddiplomefile.push(<File>event.target.files[0]);
  }
  handleFileInputAttributionf(event: any) {
    this.fileToUploadAttributionf.push(<File>event.target.files[0]);
  }
  async uploaddiplomefile(fil: File[]) {
    console.log('uploaddiplomefile');
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
          this.shortLinkdiplomefile$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.isaddedfailed = true;
        });
    }
  }

  async uploadAttributionf(fil: File[]) {
    console.log('uploadAttributionf');
    console.log(fil);
    console.log(fil.length);
    const formData = new FormData();
    for (let f of fil) {
      formData.append('document', f);

      await this.fileUploadService
        .upload(formData)
        .toPromise()
        .then((res) => {
          console.log(res);
          this.shortLinkAttributionf$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.isaddedfailed = true;
        });
    }
  }

  editFormation(formation: Formation): void {
    console.log('test ');

    this.formationService.update(formation).subscribe({
      next: (res: any) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e: any) => console.error(e),
    });
  }

  onChangeperiodique(e: any) {
    if (e.target.value === 'true') {
      this.periodiq = true;
      /*this.formation["periodec"].controls[0].setValidators([ Validators.required]);*/
    } else {
      this.periodiq = false;
    }
    console.log(this.periodiq);
  }
  handleFileInputformationFile(event: any) {
    this.fileToUploadformationFile.push(<File>event.target.files[0]);
  }
  handleFileInputhabilitationFile(event: any) {
    this.fileToUploadhabilitationFile.push(<File>event.target.files[0]);
  }
  async uploadhabilitationFile(fil: File[]) {
    console.log('habili');
    console.log(fil);
    console.log(fil.length);
    const formData = new FormData();

    for (let f of fil) {
      formData.append('document', f);

      await this.fileUploadService
        .upload(formData)
        .toPromise()
        .then((res) => {
          console.log(res);
          this.shortLinkhabilitationFile$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.isaddedfailed = true;
        });

      // Store form name as "file" with file data
    }
  }

  async uploadformationFile(fil: File[]) {
    console.log('uploadformationFile');
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
          this.shortLinkformationFile$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.isaddedfailed = true;
        });
    }
  }
  getFormationById(id: any) {
    console.log('ici');

    this.formationService.get(id).subscribe({
      next: (data: any) => {
        console.log('ici');

        console.log(data);
        this.formation = data;
      },
      error: (e: any) => console.error(e),
    });
  }
  getFormations(id:any,x:any): any {

    this.formationService.get(id).subscribe(
      (data: any) => {

       this.formations[x]=(data)
        console.log("this.currentFormation");
        console.log(data)
        console.log(this.formations)
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getdiplomss(id:any,x:any): any {

    this.diplomeService.get(id).subscribe(
      (data: any) => {

       this.diploms[x]=(data)
        console.log("this.currentFormation");
        console.log(data)
        console.log(this.formations)
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getContratss(id:any,x:any): any {

    this.contratService.get(id).subscribe(
      (data: any) => {

       this.contras[x]=(data)
        console.log("this.currentFormation");
        console.log(data)
        console.log(this.formations)
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getAttributions(id:any,x:any): any {

    this.attributionService.get(id).subscribe(
      (data: any) => {

       this.Attributions[x]=(data)
        console.log("this.currentFormation");
        console.log(data)
        console.log(this.formations)
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getMedicalvisits(id:any,x:any): any {

    this.medicalVisiteService.get(id).subscribe(
      (data: any) => {

       this.medicalvisit[x]=(data)
        console.log("this.medicalVisiteService");
        console.log(data)
        console.log(this.formations)
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getEaps(id:any,x:any): any {

    this.eapService.get(id).subscribe(
      (data: any) => {

       this.eaplist[x]=(data)
        console.log("this.eapService");
        console.log(data)
        console.log(this.formations)
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

  delnewdipl() {}
  addnewdipl() {}
  addnewformat() {}
  editEmp() {}
  editUser(user: any) {}
  onChange(e: any) {}
}
