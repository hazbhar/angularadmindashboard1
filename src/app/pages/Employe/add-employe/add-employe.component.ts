import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employe } from 'src/app/models/Employe';
import { typeContrat } from 'src/app/models/TypeContrat';
import { FrequenceService } from 'src/app/services/frequence.service';
import { RoleService } from 'src/app/services/role.service';
import { SiteService } from 'src/app/services/site.service';
import { TypecontratService } from 'src/app/services/typecontrat.service';

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
  employe!:Employe;
  diplitems!:FormArray;
  formatitems!:FormArray;
  contratitems!:FormArray;
  roleitems!:FormArray;

  personal_step = false;
  address_step = false;
  education_step = false;

  step = 1;
  typcontrattitle="";
  role! : any[];
  frequence! : any[];
  site! : any[];
  typecontrat! : typeContrat[];
  constructor(private formBuilder: FormBuilder , private roleService: RoleService, private typcontratService: TypecontratService, private siteService: SiteService, private frequenceService: FrequenceService) { }

  ngOnInit(): void {
    this.Infosgenerales = this.formBuilder.group({
      Nom: ['',[ Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
      Prenom: ['',[ Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
      DateNaissance: ['', Validators.required],
      Cin: ['', Validators.required]

  });
  this.Infoscontratdutravail = this.formBuilder.group({
    contrats:new FormArray([
    ])
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
  formations:new FormArray([])

});
this.Roles = this.formBuilder.group({
  roles:new FormArray([])

});
this.addnewcontart();
    this.addnewdipl();
    this.addnewformat();
    this.addnewrol();
    this.retrieveroles();
    this.retrievetypecontrats();
}

retrieveroles(): void {
  this.roleService.getAll()
    .subscribe({
      next: (data: any) => {
        this.role = data;
        //console.log(data);
      },
      error: (e) => console.error(e)
    });
}
//
retrievesites(): void {
  this.siteService.getAll()
    .subscribe({
      next: (data: any) => {
        this.site = data;
        //console.log(data);
      },
      error: (e) => console.error(e)
    });
}
retrievefrequences(): void {
  this.frequenceService.getAll()
    .subscribe({
      next: (data: any) => {
        this.frequence = data;
        //console.log(data);
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

get Infosgenerale() { return this.Infosgenerales.controls; }
get Infoscontrattravail() { return this.Infoscontratdutravail.controls; }
get Infosdeécurité() { return this.Infosdesecurite.controls; }
get Infosdesdiplome() { return this.Infosdesdiplomes.controls; }
get diplom( ){return this.Infosdesdiplomes.get("diplom") as FormArray}
get formations( ){return this.Competences.get("formations") as FormArray}
get roles( ){return this.Roles.get("roles") as FormArray}
get contrats( ){return this.Infoscontratdutravail.get("contrats") as FormArray}
get Competence() { return this.Competences.controls; }
get Role() { return this.Roles.controls; }

addnewdipl(){
this.diplitems=this.Infosdesdiplomes.get("diplom") as FormArray;
this.diplitems.push(this.gennewdipl());
}

gennewdipl():FormGroup{
  return new FormGroup({
    diplomes: new FormControl('', Validators.required),
    attributions:new FormControl('', Validators.required)
  })
}
addnewcontart(){
  this.contratitems=this.Infoscontratdutravail.get("contrats") as FormArray;
  this.contratitems.push(this.gennewcontrat());
  }

  gennewcontrat():FormGroup{
    return new FormGroup({
    DateDebutContrat:new FormControl('', Validators.required),
    typeContrat: new FormControl('', Validators.required),
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
    })
  }
addnewformat(){
  this.formatitems=this.Competences.get("formations") as FormArray;
  this.formatitems.push(this.gennewformat());
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
if(this.step!=6){

    if (this.Infosgenerales.invalid) { return  }
    this.step++;
}
}


  previous(){

    if(this.step!=1){
      this.step--;
  }
}
  submit(){
    if(this.step==6){

      if (this.Roles.invalid) { return }
    }
  }

}
