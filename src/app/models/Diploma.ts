import {EmployeeDiploma} from "./EmployeeDiploma";
import {AttachedDocs} from "./AttachedDocs";

export class Diploma{
  id:number;
  title:string;
  speciality?:string;
  dateObtained?:Date;
  employeeDiplomaList?:Array<EmployeeDiploma>;
  attachedDocsList?:Array<AttachedDocs>
}
