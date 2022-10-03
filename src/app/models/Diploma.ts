import {EmployeeDiploma} from "./EmployeeDiploma";
import {AttachedDocs} from "./AttachedDocs";

export class Diploma{
  id:number;
  title:string;
  speciality?:string;
  mention?:string;
  dateObtained?:Date;
  geted?:boolean;
  employeeDiplomaList?:Array<EmployeeDiploma>;
  attachedDocsList?:Array<AttachedDocs>
}
