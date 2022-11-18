import {Employe} from "./Employe";
import {Material} from "./Material";

export class HandedOver{
  id:number;
  obtained:Date;
  returned:Date;
  status:number;
  material:Material;
  employee:Employe;
}
