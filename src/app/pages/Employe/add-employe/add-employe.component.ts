import { JSDocComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Authentification } from 'src/app/models/Authentification';
import { CivilState } from 'src/app/models/CivilState';
import { Contract } from 'src/app/models/Contract';
import { Diploma } from 'src/app/models/Diploma';
import { Employe } from 'src/app/models/Employe';
import { filelink } from 'src/app/models/filelink';
import { Formation } from 'src/app/models/Formation';
import { Frequence } from 'src/app/models/Frequence';
import { Privilege } from 'src/app/models/Privilege';
import { Process } from 'src/app/models/Process';
import { Role } from 'src/app/models/Role';
import { Service } from 'src/app/models/Service';
import { Site } from 'src/app/models/Site';
import { typeContrat } from 'src/app/models/TypeContrat';
import { TypeOfStaff } from 'src/app/models/TypeOfStaff';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeService } from 'src/app/services/employe.service';
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

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css'],
})
export class AddEmployeComponent implements OnInit {
  Infosgenerales!: FormGroup;
  Infoscontratdutravail!: FormGroup;
  Infosdesecurite!: FormGroup;
  Infosdesdiplomes!: FormGroup;
  Competences!: FormGroup;
  Roles!: FormGroup;
  contra!: FormGroup;

  employe!: Employe;

  newcontrat!: Contract;

  newdiplome!: Diploma;

  newformation!: Formation;
  newuser: User;

  diplitems!: FormArray;
  formatitems!: FormArray;
  contratitems!: FormArray;
  roleitems!: FormArray;

  periodiq :Array<boolean>=[];

  typcontid: any;
  siteid: any;
  typePersonnel: any;
  typeProcessus: any;
  freque: any;
  typeAuth: any;

  step = 1;
  typcontrattitle = '';
  role!: Role[];
  privileges!: Privilege[];
  authtypeid!: Authentification[];
  frequence!: Frequence[];
  site!: Site[];
  typecontrat!: typeContrat[];
  typeperso!: TypeOfStaff[];
  etatcivil!: CivilState[];
  unitetech!: Service[];
  typprocesus!: Process[];
  submitted = false;
  errorMessage: any;
  isaddedfailed: any;
  emp!: Employe;


  fileToUploadcontratImpartialite: File;
  fileToUploadcontratConfidentialite: File;
  fileToUploadvisiteMedicales: File[]= [];
  fileToUploadremisemateriel: File[]= [];
  fileToUploadeap: File;
  fileToUploaddiplomefile: File[]= [];
  fileToUploadAttributionf: File[]= [];
  fileToUploadformationFile: File[]= [];
  fileToUploadhabilitationFile: File[]= [];

  // Variable to store shortLink from api response
  shortLinkcontratConfidentialite: any;
  shortLinkcontratImpartialite: any;
  shortLinkhabilitationFile: any=[];
  shortLinkformationFile: any=[];
  shortLinkdiplomefile: any=[];
  shortLinkAttributionf: any=[];
  shortLinkeapf: any;
  shortLinkvisiteMedicalesf: any=[];
  shortLinkremisematerielf: any=[];

  loading: boolean = false; // Flag variable
  user: { username: any; password: any; confPassword: any; email: any; confEmail: any; enabled: boolean; validity: boolean; visibility: boolean; roles: any; privileges: any; };
  usr: any;

  constructor(
    private formBuilder: FormBuilder,
    private typrocesService: ProcessService,
    private unitetechservice: ServiceService,
    private etatcivilService: EtatcivilService,
    private typepersoService: TypepersonnelService,
    private roleService: RoleService,
    private typcontratService: TypecontratService,
    private siteService: SiteService,
    private frequenceService: FrequenceService,
    private storageService: StorageService,
    private employservice: EmployeService,
    private privilegeService: PrivilegeService,
    private userService: UserService,
    private fileUploadService: FileUploadService,
    private autheService: AuthService
  ) {}

  ngOnInit(): void {
    this.retrieveroles();
    this.retrievetypecontrats();
    this.retrievefrequences();
    this.retrievesites();
    this.retrievetypeperso();
    this.retrieveetacivil();
    this.retrieveunitetech();
    this.retrievetypprocesus();
    this.retrievePrivileges();
    this.retrievetypAuth();



    this.Infosgenerales = this.formBuilder.group({
      Nom: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+')]],
      Prenom: ['', [Validators.required, Validators.pattern("^[a-zA-Z -']+")]],
      DateNaissance: ['', Validators.required],
      Cin: ['', Validators.required],
      civilState: [''],
    });

    this.Infoscontratdutravail = this.formBuilder.group({
      DateDebutContrat: new FormControl('', Validators.required),
      idtypcont: new FormControl('', Validators.required),
      frequence: new FormControl(''),
      typeProcessus: new FormControl('', Validators.required),
      available: new FormControl(''),
      remisemateriel: new FormControl('', Validators.required),
      DateFinContrat: new FormControl(''),
      typePersonnel: new FormControl('', Validators.required),
      nomSociete: new FormControl(''),
      DateVisiteMedicale: new FormControl('', Validators.required),
      DateProchVisiteMedicale: new FormControl('', Validators.required),
      uniteTechnique: new FormControl('', Validators.required),
      contratImpartialite: new FormControl('', Validators.required),
      contratConfidentialite: new FormControl('', Validators.required),
      visiteMedicales: new FormControl('', Validators.required),
      eap: new FormControl('', Validators.required),
      dateEap: new FormControl('', Validators.required),
      sitetid: new FormControl('', Validators.required),
    });

    this.Infosdesecurite = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      confirmEmail: new FormControl('', Validators.required),
      typeAuth: new FormControl('', Validators.required),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      role: new FormControl('', Validators.required),
      privilege: new FormControl('', Validators.required),
    });

    this.Infosdesdiplomes = this.formBuilder.group({
      diploma: new FormArray([]),
    });

    this.Competences = this.formBuilder.group({
      formation: new FormArray([]),
    });

    this.Roles = this.formBuilder.group({
      roles: new FormArray([]),
    });

    this.addnewdipl();
    this.addnewformat();

    console.log(this.diploma.value);
    console.log(this.formation.value);
    console.log(this.Infosgenerales.value);
    console.log(this.Infoscontratdutravail.value);
    console.log(this.Infosdesecurite.value);
    console.log('-------------');
    console.log(JSON.stringify(this.emp));
  }


  retrieveroles(): void {
    this.roleService.getAll().subscribe({
      next: (data: any) => {
        this.role = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  retrievesites(): void {
    this.siteService.getAll().subscribe({
      next: (data: any) => {
        this.site = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  retrievefrequences(): void {
    this.frequenceService.getAll().subscribe({
      next: (data: any) => {
        this.frequence = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  retrievetypecontrats(): void {
    this.typcontratService.getAll().subscribe({
      next: (data: any) => {
        this.typecontrat = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  retrievetypeperso(): void {
    this.typepersoService.getAll().subscribe({
      next: (data: any) => {
        this.typeperso = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  retrieveetacivil(): void {
    this.etatcivilService.getAll().subscribe({
      next: (data: any) => {
        this.etatcivil = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  retrieveunitetech(): void {
    this.unitetechservice.getAll().subscribe({
      next: (data: any) => {
        this.unitetech = data;
        console.log(data);
        console.log('unitetech');
      },
      error: (e) => console.error(e),
    });
  }
  retrievetypprocesus(): void {
    this.typrocesService.getAll().subscribe({
      next: (data: any) => {
        this.typprocesus = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  retrievePrivileges(): void {
    this.privilegeService.getAll().subscribe({
      next: (data: any) => {
        this.privileges = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  retrievetypAuth(): void {
    this.autheService.getAll().subscribe({
      next: (data: any) => {
        this.authtypeid = data;
        console.log('auth');
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  get Infosgenerale() {
    return this.Infosgenerales.controls;
  }
  get Infoscontrattravail() {
    return this.Infoscontratdutravail.controls;
  }
  get Infosdeécurité() {
    return this.Infosdesecurite.controls;
  }
  get Infosdesdiplome() {
    return this.Infosdesdiplomes.controls;
  }
  get diploma() {
    return this.Infosdesdiplomes.get('diploma') as FormArray;
  }
  get formation() {
    return this.Competences.get('formation') as FormArray;
  }
  get formcont() {
    return this.formation.controls;
  }
  get roles() {
    return this.Roles.get('roles') as FormArray;
  }
  get contrats() {
    return this.Infoscontratdutravail.get('contrats') as FormArray;
  }

  get Competence() {
    return this.Competences.controls;
  }
  get Role() {
    return this.Roles.controls;
  }

  addnewdipl() {
    this.diplitems = this.Infosdesdiplomes.get('diploma') as FormArray;
    this.diplitems.push(this.gennewdipl());
  }

  delnewdipl(index: any) {
    this.diplitems = this.Infosdesdiplomes.get('diploma') as FormArray;
    this.diplitems.removeAt(index);
  }

  gennewdipl(): FormGroup {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      specialite: new FormControl('', Validators.required),
      diplomefile: new FormControl('', Validators.required),
      attribution: new FormControl(''),
      Attributionf: new FormControl(''),
    });
  }

  addnewformat() {
    this.formatitems = this.Competences.get('formation') as FormArray;
    this.formatitems.push(this.gennewformat());
  }

  delnewformat(index: any) {
    this.diplitems = this.Competences.get('formation') as FormArray;
    this.diplitems.removeAt(index);
  }

  gennewformat(): FormGroup {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      periodec: new FormControl('', Validators.required),
      dateRenouvellement: new FormControl(''),
      formationFile: new FormControl('', Validators.required),
      habilitation: new FormControl('', Validators.required),
      dateHabilitation: new FormControl('', Validators.required),
      dateRenHabi: new FormControl('', Validators.required),
      habilitationFile: new FormControl('', Validators.required),
    });
  }

  next() {
    if (this.step != 5) {

      this.step++;
    }
  }

  previous() {
    if (this.step != 1) {
      this.step--;
    }
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

  handleFileInputdiplomefile(event: any) {

      this.fileToUploaddiplomefile.push(<File>event.target.files[0]);

  }
  handleFileInputformationFile(event: any) {
    this.fileToUploadformationFile.push(<File>event.target.files[0]);

  }

  handleFileInputAttributionf(event: any) {
    this.fileToUploadAttributionf.push(<File>event.target.files[0]);

  }

  handleFileInputhabilitationFile(event: any) {
    this.fileToUploadhabilitationFile.push(<File>event.target.files[0]);

  }

  uploadcontratConfidentialite(fil: File) {


    this.fileUploadService.upload(fil).subscribe({
      next: (res: any) => {
        this.shortLinkcontratConfidentialite=(res);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isaddedfailed = true;
      },
    });
  }

  uploadcontratImpartialite(fil: File) {


    this.fileUploadService.upload(fil).subscribe({
      next: (res: any) => {

        this.shortLinkcontratImpartialite
       = res;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isaddedfailed = true;
      },
    });
  }
  uploadeapf(fil: File) {


    this.fileUploadService.upload(fil).subscribe({
      next: (res: any) => {

        this.shortLinkeapf=res;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isaddedfailed = true;
      },
    });
  }
  uploadhabilitationFile(fil: File[]) {

    console.log("habili");
    console.log(fil);
    console.log(fil.length);
    let i=0;
    while (i<fil.length) {


      this.fileUploadService.upload(fil[i]).subscribe({
        next: (res: any) => {
          console.log(res);
          console.log(fil[i]);
          this.shortLinkhabilitationFile.push(res);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isaddedfailed = true;
        },
      });
      i++;
    }
    // Store form name as "file" with file data


  }

  uploadformationFile(fil: File[]) {
    console.log("uploadformationFile");
    console.log(fil);
    console.log(fil.length);
    let i=0;
    while (i<fil.length) {

      this.fileUploadService.upload(fil[i]).subscribe({
        next: (res: any) => {
          console.log(res);
          this.shortLinkformationFile.push(res);
          console.log(fil[i]);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isaddedfailed = true;
        },
      });
      i++;
    }

  }

  uploaddiplomefile(fil:File[]) {
    console.log("uploaddiplomefile");
    console.log(fil);
    console.log(fil.length);
    let i=0;
    while (i<fil.length) {

      this.fileUploadService.upload(fil[i]).subscribe({
        next: (res: any) => {

          console.log(res);
          console.log(fil[i]);
          this.shortLinkdiplomefile.push(res);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isaddedfailed = true;
        },
      });
      i++;
    // Store form name as "file" with file data



  }
}

  uploadAttributionf(fil: File[]) {
    console.log("uploadAttributionf");
    console.log(fil);
    console.log(fil.length);
    let i=0;
    while (i<fil.length) {

      this.fileUploadService.upload(fil[i]).subscribe({
        next: (res: any) => {
          console.log(res);
          console.log(fil[i]);
          this.shortLinkAttributionf.push(res);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isaddedfailed = true;
        },
      });
      i++;
    // Store form name as "file" with file data
    }

  }

  uploadvisiteMedicalesf(fil: File[]) {
    console.log("uploadvisiteMedicalesf");
    console.log(fil);
    console.log(fil.length);

    let i=0;
    while (i<fil.length) {

      this.fileUploadService.upload(fil[i]).subscribe({
        next: (res: any) => {

          console.log(res);
          console.log(fil[i]);

          this.shortLinkvisiteMedicalesf.push(res);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isaddedfailed = true;
        },
      });
      i++;
    }

  }
  uploadremisematerielf(fil:File[]) {
    console.log("uploadremisematerielf");
    console.log(fil);
    console.log(fil.length);
    let i=0;
    while (i<fil.length) {

      this.fileUploadService.upload(fil[i]).subscribe({
        next: (res: any) => {
          console.log(res);
          console.log(fil[i]);
          this.shortLinkremisematerielf.push(res);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isaddedfailed = true;
        },
      });
      i++;
    // Store form name as "file" with file data
    }


  }

  submit() {
    this.uploadremisematerielf(this.fileToUploadremisemateriel);
    this.uploadcontratConfidentialite(this.fileToUploadcontratConfidentialite);
    this.uploadcontratImpartialite(this.fileToUploadcontratImpartialite);
    this.uploadhabilitationFile(this.fileToUploadhabilitationFile);
    this.uploadformationFile(this.fileToUploadformationFile);
    this.uploaddiplomefile(this.fileToUploaddiplomefile);
    this.uploadAttributionf(this.fileToUploadAttributionf);
    this.uploadeapf(this.fileToUploadeap);
    this.uploadvisiteMedicalesf(this.fileToUploadvisiteMedicales);






    if (this.step == 5) {
      let diplo = [];
      let forma = [];
      let attribu = [];

      let prvgl = [];
      let authidty;
      let i=0
      for (let dip of this.diploma.value) {
        diplo .push( {
          employee: null,
          diploma: {
            title: dip.title,
            speciality: dip.specialite,
            periodic: this.periodiq[i],
            enabled: true,
            attacheDocsList: this.shortLinkdiplomefile,
          },
        });
        attribu .push( {
          title: dip.attribution,
          dateAttribution: '',
          attacheDocsList: this.shortLinkAttributionf,
        });
        i++;
      }

      let rll = [];
      for (let rl of this.Infosdesecurite.value.role) {
        rll.push({ id: rl });
      }

      for (let pr of this.Infosdesecurite.value.privilege) {
        prvgl.push({ id: pr });
      }

      for (let format of this.formation.value) {
        forma.push( {
          employee: null,
          formation: {
            title: format.title,
            description: format.description,
            periodic: format.periodic,
            enabled: true,

            habilitationList: [
              {
                title: format.habilitation,
                habilitationDate: format.dateHabilitation,
                habilitationRenewalDate: format.dateRenHabi,
                validity: true,
                attacheDocsList: this.shortLinkhabilitationFile,
              },
            ],
            attacheDocsList: this.shortLinkformationFile,
          },
          formationRenewalDate: format.dateRenouvellement,
        }
        );
      }

      console.log('short links');
      console.log("shortLinkcontratConfidentialite");
      console.log(this.shortLinkcontratConfidentialite);
      console.log("shortLinkcontratImpartialite");
      console.log(this.shortLinkcontratImpartialite);
      console.log("shortLinkhabilitationFile");
      console.log(this.shortLinkhabilitationFile);
      console.log("shortLinkformationFile");
      console.log(this.shortLinkformationFile);
      console.log("shortLinkdiplomefile");
      console.log(this.shortLinkdiplomefile);
      console.log("shortLinkAttributionf");
      console.log(this.shortLinkAttributionf);
      console.log("shortLinkeapf");
      console.log(this.shortLinkeapf);
      console.log("shortLinkvisiteMedicalesf");
      console.log(this.shortLinkvisiteMedicalesf);
      console.log("shortLinkremisematerielf");
      console.log(this.shortLinkremisematerielf);

      const curentuser = this.storageService.getUser();

      for (let i of this.authtypeid) {
        if (this.typeAuth == 'ldap') {
          if (i.ldap) {
            authidty = i.id;
          }
        } else {
          if (i.password) {
            authidty = i.id;
          }
        }
      }

      this.user  ={
        username: this.Infosdesecurite.value.username,
        password: this.Infosdesecurite.value.password,
        confPassword: this.Infosdesecurite.value.confirmPassword,
        email: this.Infosdesecurite.value.email,
        confEmail: this.Infosdesecurite.value.confirmEmail,
        enabled: true,
        validity: true,
        visibility: true,
        roles: rll,
        privileges: prvgl,
      }

      this.userService.create(curentuser.id,this.user).subscribe({
        next: (res: any) => {
          console.log(res);
          this.usr = res;
        },
        error: (err) => {
          console.log(this.user);
          console.log('adding user failed ');
          this.errorMessage = err.error.message;
          this.isaddedfailed = true;
        },
      });
/*
      const arrayObj = {

        firstName: this.Infosgenerales.value.Nom,
        lastName: this.Infosgenerales.value.Prenom,
        dateOfBirth: this.Infosgenerales.value.DateNaissance,
        natioIdCard: this.Infosgenerales.value.Cin.toString(),
        companyName: this.Infoscontratdutravail.value.nomSociete,
        availability: this.Infoscontratdutravail.value.available,

        impartialityContract: this.shortLinkcontratImpartialite,
        privacyContract: this.shortLinkcontratConfidentialite,
        user: this.usr,
        contractList: {
          startDate: this.Infoscontratdutravail.value.DateDebutContrat,
          endDate: this.Infoscontratdutravail.value.DateFinContrat,
          contractType: {
            id: Number(this.typcontid),
          },
        },
        medicalVisitList : [{
          dateofMv:this.Infoscontratdutravail.value.DateVisiteMedicale,
          dateofNextMv:this.Infoscontratdutravail.value.DateProchVisiteMedicale,
          attachedDocs:
            this.shortLinkvisiteMedicalesf,

        }
      ],
      handedOverList: [
        {
          obtained:"10-10-2022",
          returned:"19-10-2022",
          status:1,
          material:{
            id:22
          }
        }
      ],
      serviceList: [
        {
          technicalTerm:"tech1",
          enabled:true,
          language: {
            name: "français",
            code639_1: "FR",
            code639_2: "FRA",
            code639_3: "FRE",
            enabled: true
          }
        }
      ],
      processList: [
        {
          content:"Methode 1",
          description:"methode 1",
          abreviation:"Meth 1",
          enabled:true
        }
      ],
      site:{
        siteName:"Monplaisir",
        city:"Borjil",
        longitude:12.30,
        latitude:12.30,
        enabled:true
      },
        eapList : [
          {

              description: null,
              dateEap:this.Infoscontratdutravail.value.endDate,
              attachedDocs: this.shortLinkeapf,

          }



        ],
        employeeFormationList: [forma],
        employeeDiplomaList: [diplo],

        employeeAttributionList: [attribu],
      };

      this.employservice
        .create(
          curentuser.id,
          this.siteid,
          this.Infosgenerales.value.civilState,
          this.typePersonnel,
          arrayObj
        )
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.submitted = true;
          },
          error: (err) => {
            console.log(arrayObj);
            console.log('adding failed ');
            this.errorMessage = err.error.message;
            this.isaddedfailed = true;
          },
        });*/
    }
  }

  onChange(e: any) {
    this.typeAuth = e.target.value;
  }

  onChangeperiodique(e: any, i: any) {
    if (e.target.value == 'true') {
      this.periodiq[i] = true;
    } else {
      this.periodiq[i] = false;
    }
    console.log(this.periodiq);
  }
}
