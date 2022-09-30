import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      highest_qualification: ['', Validators.required],
      university: ['', Validators.required],
      total_marks: ['',Validators.required]
  });
  this.Infosdesdiplomes = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['',Validators.required]
});
this.Competences = this.formBuilder.group({
  name: ['', Validators.required],
  email: ['', Validators.required],
  phone: ['',Validators.required]
});
this.Roles = this.formBuilder.group({
  name: ['', Validators.required],
  email: ['', Validators.required],
  phone: ['',Validators.required]
});
}
get Infosgénérale() { return this.Infosgenerales.controls; }
get Infoscontrattravail() { return this.Infoscontratdutravail.controls; }
get Infosdeécurité() { return this.Infosdesecurite.controls; }
get Infosdesdiplome() { return this.Infosdesdiplomes.controls; }
get Competence() { return this.Competences.controls; }
get Role() { return this.Roles.controls; }
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

      if (this.Roles.invalid) { return }
    }
  }

}
