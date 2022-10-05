import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CivilState } from 'src/app/models/CivilState';
import { Contract } from 'src/app/models/Contract';
import { Diploma } from 'src/app/models/Diploma';
import { Employe } from 'src/app/models/Employe';
import { Formation } from 'src/app/models/Formation';
import { Frequence } from 'src/app/models/Frequence';
import { Process } from 'src/app/models/Process';
import { Role } from 'src/app/models/Role';
import { Service } from 'src/app/models/Service';
import { Site } from 'src/app/models/Site';
import { typeContrat } from 'src/app/models/TypeContrat';
import { TypeOfStaff } from 'src/app/models/TypeOfStaff';
import { User } from 'src/app/models/User';
import { EtatcivilService } from 'src/app/services/etatcivil.service';
import { FrequenceService } from 'src/app/services/frequence.service';
import { RoleService } from 'src/app/services/role.service';
import { ServiceService } from 'src/app/services/service.service';
import { SiteService } from 'src/app/services/site.service';
import { TypecontratService } from 'src/app/services/typecontrat.service';
import { TypepersonnelService } from 'src/app/services/typepersonnel.service';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent implements OnInit {
  Infosgenerales!: FormGroup;
  Infoscontratdutravail!: FormGroup;
  Infosdesecurite!: FormGroup;
  Infosdesdiplomes!: FormGroup;
  Competences!: FormGroup;
  Roles!: FormGroup;
  contra!: FormGroup;

  employe!:Employe;

  newuser!:User;

  newcontrat!:Contract;

  newdiplome!:Diploma;

  newformation!:Formation;

  diplitems!:FormArray;
  formatitems!:FormArray;
  contratitems!:FormArray;
  roleitems!:FormArray;

  periodiq=false;

  personal_step = false;
  address_step = false;
  education_step = false;
  periodiqu:[boolean];

  typcontid=-1;
  typePersonnel=-1;
  typeProcessus=-1;
  freque=-1;
  typeAuth="";

  step = 1;
  typcontrattitle="";
  role! : Role[];
  frequence! : Frequence[];
  site! : Site[];
  typecontrat! : typeContrat[];
  typeperso! : TypeOfStaff[];
  etatcivil! : CivilState[];
  unitetech! : Service[];
  typprocesus! : Process[];


  constructor(private formBuilder: FormBuilder,private unitetechservice:ServiceService, private etatcivilService:EtatcivilService, private typepersoService: TypepersonnelService , private roleService: RoleService, private typcontratService: TypecontratService, private siteService: SiteService, private frequenceService: FrequenceService) { }

  ngOnInit(): void {

    this.retrieveroles();
    this.retrievetypecontrats();
    this.retrievefrequences();
    this.retrievesites();
    this.retrievetypeperso();
    this.retrieveetacivil();
    this.retrieveunitetech();
    this.retrievetypprocesus();

    this.Infosgenerales = this.formBuilder.group({
      Nom: ['',[ Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
      Prenom: ['',[ Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
      DateNaissance: ['', Validators.required],
      Cin: ['', Validators.required],
      civilState: ['', Validators.required]

  });

  this.Infoscontratdutravail = this.formBuilder.group({

      DateDebutContrat:new FormControl('', Validators.required),

      idtypcont:new FormControl('', Validators.required),

      frequence:new FormControl('', Validators.required),
      available:new FormControl('', Validators.required),
      DateFinContrat:new FormControl('', Validators.required),
      typePersonnel:new FormControl('', Validators.required),
      nomSociete: new FormControl('', Validators.required),
      uniteTechnique:new FormControl('', Validators.required),
      contratImpartialite: new FormControl('', Validators.required),
      contratConfidentialite: new FormControl('', Validators.required),
      visiteMedicales: new FormControl('', Validators.required),
      eap: new FormControl('', Validators.required),
      dateEap: new FormControl('', Validators.required),
      site: new FormControl('',Validators.required)

  });

  this.Infosdesecurite = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    confirmEmail: ['',Validators.required],
    typeAuth: ['',Validators.required],
    password: ['',Validators.required],
    confirmPassword: ['',Validators.required]
  });

  this.Infosdesdiplomes = this.formBuilder.group({
    diplom:new FormArray([]),
});

this.Competences = this.formBuilder.group({
  formations:new FormArray([

  ])

});

this.Roles = this.formBuilder.group({
  roles:new FormArray([])

});

    this.addnewdipl();
    this.addnewformat();
    this.addnewrol();


console.log(this.contrats.value);
console.log(this.diplom.value);
console.log(this.formations.value);
console.log(this.Infosgenerales.value);
console.log(this.Infoscontratdutravail.value);
console.log(this.Infoscontratdutravail.value.idtypcont);
}

retrieveroles(): void {
  this.roleService.getAll()
    .subscribe({
      next: (data: any) => {
        this.role = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

retrievesites(): void {
  this.siteService.getAll()
    .subscribe({
      next: (data: any) => {
        this.site = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

retrievefrequences(): void {
  this.frequenceService.getAll()
    .subscribe({
      next: (data: any) => {
        this.frequence = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

retrievetypecontrats(): void {
  this.typcontratService.getAll()
    .subscribe({
      next: (data: any) => {
        this.typecontrat = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}
retrievetypeperso(): void {
  this.typepersoService.getAll()
    .subscribe({
      next: (data: any) => {
        this.typeperso = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}
retrieveetacivil(): void {
  this.etatcivilService.getAll()
    .subscribe({
      next: (data: any) => {
        this.etatcivil = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

retrieveunitetech():void{
  this.unitetechservice.getAll()
    .subscribe({
      next: (data: any) => {
        this.unitetech = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}
retrievetypprocesus():void{
  this.unitetechservice.getAll()
    .subscribe({
      next: (data: any) => {
        this.unitetech = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}
get Infosgenerale() { return this.Infosgenerales.controls; }
get Infoscontrattravail() { return this.Infoscontratdutravail.controls; }
get Infosdeécurité() { return this.Infosdesecurite.controls; }
get Infosdesdiplome() { return this.Infosdesdiplomes.controls; }
get diplom( ){return this.Infosdesdiplomes.get("diplom") as FormArray}
get formations( ){return this.Competences.get("formations") as FormArray}
get formcont(){return this.formations.controls;}
get roles( ){return this.Roles.get("roles") as FormArray}
get contrats( ){return this.Infoscontratdutravail.get("contrats") as FormArray}

get Competence() { return this.Competences.controls; }
get Role() { return this.Roles.controls; }

addnewdipl(){
this.diplitems=this.Infosdesdiplomes.get("diplom") as FormArray;
this.diplitems.push(this.gennewdipl());

}

delnewdipl(index:any){
  this.diplitems=this.Infosdesdiplomes.get("diplom") as FormArray;
  this.diplitems.removeAt(index);
}

gennewdipl():FormGroup{
  return new FormGroup({
    choisirdiplomes:new FormControl('', Validators.required),
    specialite:new FormControl('', Validators.required),
    diplomes: new FormControl('', Validators.required),
    attributions:new FormControl('', Validators.required),
    Attributionf:new FormControl('', Validators.required),
  })
}

addnewformat(){
  this.formatitems=this.Competences.get("formations") as FormArray;
  this.formatitems.push(this.gennewformat());
  var periodiqu=false;
  }

delnewformat(index:any){
    this.diplitems=this.Competences.get("formations") as FormArray;
    this.diplitems.removeAt(index);
  }

gennewformat():FormGroup{
  return new FormGroup({
    formation: new FormControl('', Validators.required),
    periodique:  new FormControl('', Validators.required),
    dateRenouvellement:  new FormControl('',Validators.required),
    formationFile:  new FormControl('',Validators.required),
    habilitation: new FormControl('',Validators.required),
    dateHabilitation:  new FormControl('',Validators.required),
    dateRenHabi: new FormControl('',Validators.required),
    habilitationFile:  new FormControl('',Validators.required)
  })
}

addnewrol(){
  this.roleitems=this.Roles.get("roles") as FormArray;
  this.roleitems.push(this.gennewrol());
  }

gennewrol():FormGroup{
  return new FormGroup({
    role: new FormControl('', Validators.required)
  })
}

next(){
if(this.step!=5){
  console.log(this.Infosgenerales.value);
  console.log(this.Infoscontratdutravail.value);

    this.step++;
}
}

previous(){

    if(this.step!=1){
      this.step--;
  }
}

submit(){
    if(this.step==5){
    }      console.log("test");

    console.log(this.typeAuth);

}

onChange(e:any) {
  this.typeAuth= e.target.value;
}
onChangeperiodique(e:any,i:any) {

  if(e.target.value == "true"){
    this.periodiq= true;
  }else{
    this.periodiq= false;
  }
  console.log(this.periodiq);
}
}
