import {AttachedDocs} from "./AttachedDocs";

export class DocType{
  id:number;
  type:string;
  extension:string;
  enabled:boolean;
  attachedDocs:Array<AttachedDocs>
}
