import {Employe} from "./Employe";
import {Formation} from "./Formation";

export class EmployeeFormation{
  id:number;
  employee:Employe;
  formation:Formation;
  formationRenewalDate:Date;
}
