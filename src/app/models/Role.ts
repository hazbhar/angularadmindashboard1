import { Employe } from "./Employe";

export class Role{
  id:number;
  roleName:string;
  validity?:Date;
  enabled:boolean;
  employeeList?:Array<Employe>

}
