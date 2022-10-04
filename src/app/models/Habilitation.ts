import {AttachedDocs} from "./AttachedDocs";
import {Formation} from "./Formation";

export class Habilitation{
  id:number;
  title:string;
  habilitationDate?:Date;
  habilitationRenewalDate?:Date;
  validity:boolean;
  attachedDocsList?:Array<AttachedDocs>;
  formation?:Formation;
}
