import {Authentification} from "./Authentification";
import {Employe} from "./Employe";
import {Role} from "./Role";
import {Privilege} from "./Privilege";

export class User{
  id:any;
  username: String;
  password: String;
  confPassword: String;
  email: String;
  confEmail:string;
  lastconnection: Date;
  validity: boolean ;
  enabled: boolean ;
  authentifications:Authentification;
  employee:Employe;
  roles: Role[] ;
  privileges :Privilege[];
}
