import {AttachedDocs} from "./AttachedDocs";
import {EmployeeFormation} from "./EmployeeFormation";

export class Formation{
  id:number;
  title:string;
  description?:string;
  periodec:boolean;
  enabled:boolean;
  employeeFormationList:Array<EmployeeFormation>;
  habilitationList:Array<any>
  attachedDocsList?:Array<AttachedDocs>;


}
