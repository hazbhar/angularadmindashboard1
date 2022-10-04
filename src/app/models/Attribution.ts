import {AttachedDocs} from "./AttachedDocs";
import {EmployeeAttribution} from "./EmployeeAttribution";

export class Attribution{
  id:number;
  title:string;
  dateAttribution:Date;
  employeeAttributionList:Array<EmployeeAttribution>;
  attachedDocsList?:Array<AttachedDocs>;

}
