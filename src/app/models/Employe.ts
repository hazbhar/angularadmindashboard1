export class Employe{
  /**** Infos générales ****/
  id:any;
  nom?:string;
  prenom?:string;
  initiale?:string;
  dateNaissance?:Date;
  etatCivil?:string;
  cin?:string;

  /**** Infos contrat du travail ****/
  DateDebutContrat?:Date;
  DateFinContrat?:Date;
  typeContrat?:string;
  frequence?:number;
  typePersonnel?:string;
  processuses?:any;
  available?:Boolean;
  nomSociete?:string;
  uniteTechnique?:string;
  site?:string;
  materiels:any;
  contratImpartialite?:string
  contratConfidentialite?:string;
  visiteMedicales:any;
  eap?:string;
  dateEap?:Date;

  /**** Infos des diplomes ****/
  diplomes:any;
  attributions:any

  /**** Competences ****/
  formation?:string;
  periodique?:Boolean;
  dateRenouvellement?:Date;
  formationFile?:string;
  habilitation?:string;
  dateHabilitation?:Date;
  dateRenHabi?:Date;
  habilitationFile?:string;
  /**** Infos de sécurité ****/
  username?:string;
  email?:string;
  confirmEmail?:string;
  lastConnexion?:Date;
  typeAuth?:string;
  visibilite?:Boolean;
  password?:string;
  confirmPassword?:string;
  /**** Roles ****/
  roles:any;


/*
  constructor(id: number, nom: string, prenom: string, initiale: string, dateNaissance: Date, etatCivil: string, cin: string, DateDebutContrat: Date, DateFinContrat: Date, typeContrat: string, frequence: number, typePersonnel: string, processuses: any, available: Boolean, nomSociete: string, uniteTechnique: string, site: string, materiels: any, contratImpartialite: string, contratConfidentialite: string, visiteMedicales: any, eap: string, dateEap: Date, diplomes: any, attributions: any, formation: string, periodique: Boolean, dateRenouvellement: Date, formationFile: string, habilitation: string, dateHabilitation: Date, dateRenHabi: Date, habilitationFile: string, username: string, email: string, confirmEmail: string, lastConnexion: Date, typeAuth: string, visibilite: Boolean, password: string, confirmPassword: string, roles: any) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.initiale = initiale;
    this.dateNaissance = dateNaissance;
    this.etatCivil = etatCivil;
    this.cin = cin;
    this.DateDebutContrat = DateDebutContrat;
    this.DateFinContrat = DateFinContrat;
    this.typeContrat = typeContrat;
    this.frequence = frequence;
    this.typePersonnel = typePersonnel;
    this.processuses = processuses;
    this.available = available;
    this.nomSociete = nomSociete;
    this.uniteTechnique = uniteTechnique;
    this.site = site;
    this.materiels = materiels;
    this.contratImpartialite = contratImpartialite;
    this.contratConfidentialite = contratConfidentialite;
    this.visiteMedicales = visiteMedicales;
    this.eap = eap;
    this.dateEap = dateEap;
    this.diplomes = diplomes;
    this.attributions = attributions;
    this.formation = formation;
    this.periodique = periodique;
    this.dateRenouvellement = dateRenouvellement;
    this.formationFile = formationFile;
    this.habilitation = habilitation;
    this.dateHabilitation = dateHabilitation;
    this.dateRenHabi = dateRenHabi;
    this.habilitationFile = habilitationFile;
    this.username = username;
    this.email = email;
    this.confirmEmail = confirmEmail;
    this.lastConnexion = lastConnexion;
    this.typeAuth = typeAuth;
    this.visibilite = visibilite;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.roles = roles;
  }*/
}
