import {Employe} from "./Employe";

export class TypeOfStaff{
  id:number;
  job:string;
  enabled:boolean;
  employeeList?:Array<Employe>
}
