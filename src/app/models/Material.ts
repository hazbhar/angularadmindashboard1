import {HandedOver} from "./HandedOver";

export class Material{
  id:number;
  reference:string;
  name:string;
  status:number;
  availability:boolean;
  handedOverList:Array<HandedOver>;
}
