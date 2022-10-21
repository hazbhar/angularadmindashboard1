import {Employe} from "./Employe";
import {Frequence} from "./Frequence";
import {ContractType} from "./ContractType";

export class Contract{
  id!:number;
  startDate:Date;
  endDate:Date;
  frequence:Frequence;
  employee:Employe;
  contractType:ContractType;
}
