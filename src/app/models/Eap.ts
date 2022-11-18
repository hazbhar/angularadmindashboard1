import {Employe} from "./Employe";
import {AttachedDocs} from "./AttachedDocs";

export class Eap{
  id:number;
  description: string;
  dateEap:Date;
  employee:Employe;
  attachedDocs:Array<AttachedDocs>;

}
