import {Employe} from "./Employe";

export class Site{
  id:number;
  siteName:string;
  city:string;
  longitude:number;
  laltitude:number;
  enabled:boolean;
  employeeList!:Array<any>
}
