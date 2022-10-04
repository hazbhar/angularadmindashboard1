import {Employe} from "./Employe";

export class MedicalVisit{
  id:number;
  dateOfMv?:Date;
  dateOfNextMv?:Date;
  employee:Employe;
}
