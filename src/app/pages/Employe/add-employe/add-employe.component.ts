import { DatePipe } from '@angular/common';
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
  datePipe = new DatePipe('en-US');
  /**
   * form group for every step
   */
  Infosgenerales!: FormGroup;
  Infoscontratdutravail!: FormGroup;
  Infosdesecurite!: FormGroup;
  Infosdesdiplomes!: FormGroup;
  Competences!: FormGroup;
  Roles!: FormGroup;
  contra!: FormGroup;
  /**
   * form arrays for every possible multiple same formgroup
   */
  diplitems!: FormArray;
  formatitems!: FormArray;
  contratitems!: FormArray;
  roleitems!: FormArray;


  useradded:boolean;
  userfailedadd:boolean
  employyeeadded:boolean;
  employyeefailedadd:boolean;
  userdeleted:boolean
  /**
   * boolean array for periodic formation wich can be  multiple
   */
  periodiq: boolean[] = [];
  /**
   * variables to register from forms to test their values
   */
  typcontid: any;
  siteid: any;
  typePersonnel: any;
  typeProcessus: any;
  freque: any;
  typeAuth: any;
  /**
   * add employe step value
   */
  step = 1;
  /**
   * observable variables
   */
  role$!: Role[];
  privileges$!: Privilege[];
  authtypeid$!: Authentification[];
  frequence$!: Frequence[];
  site$!: Site[];
  typecontrat$!: typeContrat[];
  typeperso$!: TypeOfStaff[];
  etatcivil$!: CivilState[];
  unitetech$!: Service[];
  typprocesus$!: Process[];

  /**
   * variables to define the response from services
   */
  submitted = false;
  errorMessage = '';
  isaddedfailed = false;

  /**
   * variables to stock files from forms
   */
  fileToUploadcontratImpartialite: File;
  fileToUploadcontratConfidentialite: File;
  fileToUploadvisiteMedicales: File[] = [];
  fileToUploadremisemateriel: File[] = [];
  fileToUploadeap: File;
  fileToUploaddiplomefile: File[] = [];
  fileToUploadAttributionf: File[] = [];
  fileToUploadformationFile: File[] = [];
  fileToUploadhabilitationFile: File[] = [];

  /**
   *  Variable to store shortLink from api response
   */
  shortLinkcontratConfidentialite$: any;
  shortLinkcontratImpartialite$: any;
  shortLinkhabilitationFile$: Array<any>;
  shortLinkformationFile$: Array<any>;
  shortLinkdiplomefile$: Array<any>;
  shortLinkAttributionf$: Array<any>;
  shortLinkeapf$: any;
  shortLinkvisiteMedicalesf$: Array<any>;
  shortLinkremisematerielf$: Array<any>;

  loading: boolean = false; // Flag variable

  /**
   * observable user from add user in add employee
   */
  usr$: User;
  athpassd: boolean = false;

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
  ) {
    /**
     * creating forms groups
     */
    this.Infosgenerales = this.formBuilder.group({
      Nom: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z ]+')]),
      Prenom: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z -']+")]),
      DateNaissance:new FormControl( '', [Validators.required]),
      Cin:new FormControl( '', Validators.required),
      civilState:new FormControl(''),
    });

    this.Infoscontratdutravail = this.formBuilder.group({
      DateDebutContrat: new FormControl('', Validators.required),
      idtypcont: new FormControl('', Validators.required),
      frequence: new FormControl(''),
      typeProcessus: new FormControl('', Validators.required),
      available: new FormControl(''),
      remisemateriel: new FormControl(''),
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

    this.Infosdesecurite = this.formBuilder.group(
      {
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required,Validators.email]),
        confirmEmail: new FormControl('', [Validators.required,Validators.email]),
        typeAuth: new FormControl('', Validators.required),
        password: new FormControl('',[ Validators.minLength(6)]),
        confirmPassword: new FormControl('',[ Validators.minLength(6)]),
        role: new FormControl('', Validators.required),
        privilege: new FormControl('', Validators.required),
      },
      {}
    );
    /**
     * from arrays that possible to be multiple
     */
    this.Infosdesdiplomes = this.formBuilder.group({
      diploma: new FormArray([]),
    });

    this.Competences = this.formBuilder.group({
      formation: new FormArray([]),
    });
    /**
     * creating the first form in the form arrays
     */

    this.addnewdipl();
    this.addnewformat();
  }

  ngOnInit(): void {
    this.periodiq[0] = false;
    this.resetshortlinks();
    /**
     * services to get from API
     */
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
  }
  /**
   * services functions to get from API
   */
  retrieveroles(): void {
    this.roleService.getAll().subscribe({
      next: (data: any) => {
        this.role$ = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
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
  retrieveetacivil(): void {
    this.etatcivilService.getAll().subscribe({
      next: (data: any) => {
        this.etatcivil$ = data;
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

  retrievePrivileges(): void {
    this.privilegeService.getAll().subscribe({
      next: (data: any) => {
        this.privileges$ = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  retrievetypAuth(): void {
    this.autheService.getAll().subscribe({
      next: (data: any) => {
        this.authtypeid$ = data;
        console.log('auth');
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  /**
   * getting values inserted in the forms
   */
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

  /**
   * function to add new form group diplome in the form array
   */
  addnewdipl() {
    this.diplitems = this.Infosdesdiplomes.get('diploma') as FormArray;
    this.diplitems.push(this.gennewdipl());
  }
  /**
   * function to delete new form group diplome from the form array
   */
  delnewdipl(index: any) {
    this.diplitems = this.Infosdesdiplomes.get('diploma') as FormArray;
    this.diplitems.removeAt(index);
  }
  /**
   * function to generate new form group diplome before adding it to the form array
   */
  gennewdipl(): FormGroup {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      specialite: new FormControl('', Validators.required),
      diplomefile: new FormControl('', Validators.required),
      attribution: new FormControl(''),
      Attributionf: new FormControl(''),
    });
  }
  /**
   * function to add new form group diplome in the form array
   */
  addnewformat() {
    this.formatitems = this.Competences.get('formation') as FormArray;
    this.formatitems.push(this.gennewformat());
  }
  /**
   * function to add new form group diplome in the form array
   */
  delnewformat(index: any) {
    this.formatitems = this.Competences.get('formation') as FormArray;
    this.formatitems.removeAt(index);
  }
  /**
   * function to generate new form group diplome before adding it to the form array
   */
  gennewformat(): FormGroup {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      periodec: new FormControl(''),
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

  async uploadcontratConfidentialite(fil: File) {
    const formData = new FormData();
    formData.append('document', fil);
    this.fileUploadService
      .upload(formData)
      .toPromise()
      .then((data) => {
        this.shortLinkcontratConfidentialite$ = data;
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  async  uploadcontratImpartialite(fil: File) {
    const formData = new FormData();
    formData.append('document', fil);
    this.fileUploadService
      .upload(formData)
      .toPromise()
      .then((res) => {
        this.shortLinkcontratImpartialite$ = res;
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
  async   uploadeapf(fil: File) {
    const formData = new FormData();
    formData.append('document', fil);
    this.fileUploadService.upload(formData).subscribe({
      next: (res) => {
        this.shortLinkeapf$ = res;
        console.info('complete');
      },
    });
  }
  async  uploadhabilitationFile(fil: File[]) {
    console.log('habili');
    console.log(fil);
    console.log(fil.length);
    const formData = new FormData();

    for (let f of fil) {
      formData.append('document', f);

      this.fileUploadService
        .upload(formData)
        .toPromise()
        .then((res) => {
          console.log(res);
          this.shortLinkhabilitationFile$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });

      // Store form name as "file" with file data
    }
  }

  async  uploadformationFile(fil: File[]) {
    console.log('uploadformationFile');
    console.log(fil);
    console.log(fil.length);

    for (let f of fil) {
      const formData = new FormData();

      formData.append('document', f);
      this.fileUploadService
        .upload(formData)
        .toPromise()
        .then((res) => {
          console.log(res);
          this.shortLinkformationFile$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    }
  }

  async  uploaddiplomefile(fil: File[]) {
    console.log('uploaddiplomefile');
    console.log(fil);
    console.log(fil.length);
    for (let f of fil) {
      const formData = new FormData();

      formData.append('document', f);
      this.fileUploadService
        .upload(formData)
        .toPromise()
        .then((res) => {
          console.log(res);
          this.shortLinkdiplomefile$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    }
  }

  async  uploadAttributionf(fil: File[]) {
    console.log('uploadAttributionf');
    console.log(fil);
    console.log(fil.length);
    const formData = new FormData();
    for (let f of fil) {
      formData.append('document', f);

      this.fileUploadService
        .upload(formData)
        .toPromise()
        .then((res) => {
          console.log(res);
          this.shortLinkAttributionf$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    }
  }

  async  uploadvisiteMedicalesf(fil: File[]) {
    console.log('uploadvisiteMedicalesf');
    console.log(fil);
    console.log(fil.length);
    for (let f of fil) {
      const formData = new FormData();

      formData.append('document', f);

      this.fileUploadService
        .upload(formData)
        .toPromise()
        .then((res) => {
          console.log(res);

          this.shortLinkvisiteMedicalesf$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    }
  }
  async  uploadremisematerielf(fil: File[]) {
    console.log('uploadremisematerielf');
    console.log(fil);
    console.log(fil.length);
    for (let f of fil) {
      const formData = new FormData();

      formData.append('document', f);
      this.fileUploadService
        .upload(formData)
        .toPromise()
        .then((res) => {
          console.log(res);
          this.shortLinkremisematerielf$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    }
  }

  async  submit() {
    await this.uploadremisematerielf(this.fileToUploadremisemateriel);
    await this.uploadcontratConfidentialite(this.fileToUploadcontratConfidentialite);
    await this.uploadcontratImpartialite(this.fileToUploadcontratImpartialite);
    await this.uploadhabilitationFile(this.fileToUploadhabilitationFile);
    await this.uploadformationFile(this.fileToUploadformationFile);
    await this.uploaddiplomefile(this.fileToUploaddiplomefile);
    await this.uploadAttributionf(this.fileToUploadAttributionf);
    await this.uploadeapf(this.fileToUploadeap);
    await this.uploadvisiteMedicalesf(this.fileToUploadvisiteMedicales);


    if (this.step == 5) {
      await this.adduser();


    }
    this.resetshortlinks();
  }
  async addemploye() {
    let diplo = [];
    let forma = [];
    let attribu = [];

    let indexformation = 0;
    let indexdiplom = 0;

    for (let dip of this.diploma.value) {
      diplo.push({
        employee: null,
        diploma: {
          title: dip.title,
          speciality: dip.specialite,
          dateObtained: '20-11-2008',
          attachedDocsList: [this.shortLinkdiplomefile$[indexdiplom]],
        },
      });
      attribu.push({
        employee: null,
        attribution: {
          title: dip.attribution,
          dateAttribution: '20-11-2008',
          attachedDocsList: [this.shortLinkAttributionf$[indexdiplom]],
        },
      });
      indexdiplom++;
    }
    for (let format of this.formation.value) {
      let formrendat = null;
      formrendat = '31-08-2013';
      if (format.dateRenouvellement) {
        formrendat = this.datePipe.transform(
          format.dateRenouvellement,
          'dd-MM-yyyy'
        );
      }
      forma.push({
        employee: null,
        formation: {
          title: format.title,
          description: '',
          periodec: Boolean(format.periodec),
          enabled: true,

          habilitationList: [
            {
              title: format.habilitation,
              habilitationDate: this.datePipe.transform(
                format.dateHabilitation,
                'dd-MM-yyyy'
              ),
              habilitationRenewalDate: this.datePipe.transform(
                format.dateRenHabi,
                'dd-MM-yyyy'
              ),
              attachedDocsList: [
                this.shortLinkhabilitationFile$[indexformation],
              ],
            },
          ],
          attachedDocsList: [this.shortLinkformationFile$[indexformation]],
        },
        formationRenewalDate: formrendat,
      });
      indexformation++;
    }

    let freq = null;
    if (this.Infoscontratdutravail.value.frequence)
      freq = this.Infoscontratdutravail.value.frequence;
    const arrayObj = {
      firstName: this.Infosgenerales.value.Nom,
      lastName: this.Infosgenerales.value.Prenom,
      dateOfBirth: this.datePipe.transform(
        this.Infosgenerales.value.DateNaissance,
        'dd-MM-yyyy'
      ),
      natioIdCard: this.Infosgenerales.value.Cin.toString(),
      companyName: this.Infoscontratdutravail.value.nomSociete,
      availability: this.Infoscontratdutravail.value.available,

      impartialityContract: this.shortLinkcontratImpartialite$['urlFile'],
      privacyContract: this.shortLinkcontratConfidentialite$['urlFile'],
      user: {
        id: Number(this.usr$.id),
      },
      contractList: [
        {
          startDate: this.datePipe.transform(
            this.Infoscontratdutravail.value.DateDebutContrat,
            'dd-MM-yyyy'
          ),
          endDate: this.datePipe.transform(
            this.Infoscontratdutravail.value.DateFinContrat,
            'dd-MM-yyyy'
          ),
          frequence: freq,
          contractType: {
            id: Number(this.typcontid),
          },
        },
      ],
      medicalVisitList: [
        {
          dateofMv: this.datePipe.transform(
            this.Infoscontratdutravail.value.DateVisiteMedicale,
            'dd-MM-yyyy'
          ),
          dateofNextMv: this.datePipe.transform(
            this.Infoscontratdutravail.value.DateProchVisiteMedicale,
            'dd-MM-yyyy'
          ),
          test: 'ceci est un test',
          attachedDocsList: this.shortLinkvisiteMedicalesf$,
        },
      ],
      handedOverList: [
        {
          obtained: null,
          returned: null,
          status: null,
          material: null,
          attachedDocsList: this.shortLinkremisematerielf$,
        },
      ],
      serviceList: [
        { id: Number(this.Infoscontratdutravail.value.uniteTechnique) },
      ],
      processList: [
        { id: Number(this.Infoscontratdutravail.value.typeProcessus) },
      ],

      eapList: [
        {
          description: '',
          dateEap: this.datePipe.transform(
            this.Infoscontratdutravail.value.dateEap,
            'dd-MM-yyyy'
          ),
          attachedDocsList: [this.shortLinkeapf$],
        },
      ],
      employeeFormationList: forma,
      employeeDiplomaList: diplo,

      employeeAttributionList: attribu,
    };
    this.employservice
      .create(
        Number(this.usr$.id),
        this.siteid,
        this.Infosgenerales.value.civilState,
        this.typePersonnel,
        arrayObj
      )
      .toPromise()
      .then((res) => {
        console.log(res);

        console.log('adding emp succeded ');
        this.employyeeadded=true;

      })
      .catch((error) => {
        console.log('adding emp failed ');
        this.errorMessage = error.message;
        this.employyeefailedadd=true;
        this.deleteuser(Number(this.usr$.id))
      });
  }
  async  adduser() {
    let prvgl = [];
    let authidty;

    let rll = [];
    for (let rl of this.Infosdesecurite.value.role) {
      rll.push({ id: rl });
    }

    for (let pr of this.Infosdesecurite.value.privilege) {
      prvgl.push({ id: pr });
    }
    for (let i of this.authtypeid$) {
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

      const user = {
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
    };

    this.userService
      .create(authidty, user)
      .toPromise()
      .then((res) => {
        console.log(res);
        this.usr$ = res;
        console.log('adding user succeded ');
        this.useradded=true;

      })
      .catch((error) => {
        console.log(user);
        console.log('adding user failed ');
        this.errorMessage = error.message;
        this.userfailedadd=false;
      })
      .finally(()=>{
        if(this.useradded==true)this.addemploye();
  });
  }

deleteuser(id:any){
  this.userService.delete(id).toPromise()
  .then(() => {
    console.log('deleting user succeded ');
    this.userdeleted=true;
  })
  .catch((error) => {
    console.log('deleting user failed ');
    this.errorMessage = error.message;
    this.userdeleted=false;
  })

}

  onChange(e: any) {
    this.typeAuth = e.target.value;
    if (this.typeAuth === 'mdp') {
      this.athpassd = true;
    } else {
      this.athpassd = false;
    }
    console.log(this.typeAuth);
  }

  onChangeperiodique(e: any, i: any) {
    if (e.target.value === 'true') {
      this.periodiq[i] = true;
    } else {
      this.periodiq[i] = false;
    }
    console.log(this.periodiq);
  }

  resetshortlinks() {
    console.log('reseting short links ');
    this.shortLinkcontratConfidentialite$ = [];
    this.shortLinkcontratImpartialite$ = [];
    this.shortLinkhabilitationFile$ = [];
    this.shortLinkformationFile$ = [];
    this.shortLinkdiplomefile$ = [];
    this.shortLinkAttributionf$ = [];
    this.shortLinkeapf$ = [];
    this.shortLinkvisiteMedicalesf$ = [];
    this.shortLinkremisematerielf$ = [];
  }
}
