import {Contract} from "./Contract";

export class ContractType{
  id:number;
  title:string;
  enabled:boolean;
  contractList:Array<Contract>
}
