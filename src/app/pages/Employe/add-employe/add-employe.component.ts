import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employe } from 'src/app/models/Employe';

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
  step = 1;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.Infosgenerales = this.formBuilder.group({
      name: ['', Validators.required],
      Prenom: ['', Validators.required],
      initiale: ['', Validators.required],
      DateNaissance: ['', Validators.required],
      Cin: ['', Validators.required]

  });
  this.Infoscontratdutravail = this.formBuilder.group({
    DateDebutContrat: ['', Validators.required],
    typeContrat: ['', Validators.required],
    frequence: ['', Validators.required],
    available: ['', Validators.required],
    DateFinContrat: ['', Validators.required],
    typePersonnel: ['', Validators.required],
    nomSociete: ['', Validators.required],
    uniteTechnique: ['', Validators.required],
    contratImpartialite: ['', Validators.required],
    contratConfidentialite: ['', Validators.required],
    visiteMedicales: ['', Validators.required],
    eap: ['', Validators.required],
    dateEap: ['', Validators.required],
    site: ['',Validators.required]
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
  formation: ['', Validators.required],
  periodique: ['', Validators.required],
  dateRenouvellement: ['',Validators.required],
  formationFile: ['',Validators.required],
  habilitation: ['',Validators.required],
  dateHabilitation: ['',Validators.required],
  dateRenHabi: ['',Validators.required],
  habilitationFile: ['',Validators.required]
});
this.Roles = this.formBuilder.group({
  role: ['', Validators.required]

});

    this.addnewdipl();
}
get Infosgénérale() { return this.Infosgenerales.controls; }
get Infoscontrattravail() { return this.Infoscontratdutravail.controls; }
get Infosdeécurité() { return this.Infosdesecurite.controls; }
get Infosdesdiplome() { return this.Infosdesdiplomes.controls; }
get diplom( ){return this.Infosdesdiplomes.get("diplom") as FormArray}
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

next(){
if(this.step!=6){
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
    /*  this.employe ={
        nom:this.Infosgénérale['name'].value,
        prenom:this.Infosgénérale['prenom'].value,
        initiale:this.Infosgénérale['initiale'].value,
        dateNaissance:this.Infosgénérale['dateNaissance'].value,
        etatCivil:this.Infosgénérale['etatCivil'].value,
        cin:this.Infosgénérale['cin'].value,
        DateDebutContrat:this.Infoscontrattravail['DateDebutContrat'].value,
        DateFinContrat:this.Infoscontrattravail['typeContrat'].value,
        typeContrat:this.Infoscontrattravail['typeContrat'].value,
        frequence:this.Infoscontrattravail['frequence'].value,
        typePersonnel:this.Infoscontrattravail['available'].value,
        processuses:this.Infoscontrattravail['cin'].value,
        available:this.Infoscontrattravail['typePersonnel'].value,
        nomSociete:this.Infoscontrattravail['nomSociete'].value,
        uniteTechnique:this.Infoscontrattravail['uniteTechnique'].value,
        site:this.Infoscontrattravail['site'].value,
        materiels:this.Infoscontrattravail['materiels'].value,
        contratImpartialite:this.Infoscontrattravail['contratImpartialite'].value,
        contratConfidentialite:this.Infoscontrattravail['contratConfidentialite'].value,
        visiteMedicales:this.Infoscontrattravail['visiteMedicales'].value,
        eap:this.Infoscontrattravail['eap'].value,
        dateEap:this.Infoscontrattravail['dateEap'].value,
        diplomes:this.Infosdesdiplome['diplomes'].value,
        attributions:this.Infosdesdiplome['attributions'].value,
        formation:this.Competence['formation'].value,
        periodique:this.Competence['periodique'].value,
        dateRenouvellement:this.Competence['dateRenouvellement'].value,
        formationFile:this.Competence['formationFile'].value,
        habilitation:this.Competence['habilitation'].value,
        dateHabilitation:this.Competence['dateHabilitation'].value,
        dateRenHabi:this.Competence['dateRenHabi'].value,
        habilitationFile:this.Competence['habilitationFile'].value,
        username:this.Infosdeécurité['username'].value,
        email:this.Infosdeécurité['email'].value,
        confirmEmail:this.Infosdeécurité['confirmEmail'].value,
        typeAuth:this.Infosdeécurité['typeAuth'].value,
        visibilite:this.Infosdeécurité['cin'].value,
        confirmPassword:this.Infosdeécurité['password'].value,
        password:this.Infosdeécurité['password'].value,
        roles:this.Role['role'].value


      };*/
      if (this.Roles.invalid) { return }
    }
  }

}
