import {User} from "./User";
import {Contract} from "./Contract";
import {MedicalVisit} from "./MedicalVisit";
import {HandedOver} from "./HandedOver";
import {Service} from "./Service";
import {Process} from "./Process";
import {Eap} from "./Eap";
import {Site} from "./Site";
import {EmployeeFormation} from "./EmployeeFormation";
import {EmployeeDiploma} from "./EmployeeDiploma";
import {EmployeeAttribution} from "./EmployeeAttribution";
import {CivilState} from "./CivilState";
import {TypeOfStaff} from "./TypeOfStaff";

export class Employe {

  id: any;
  firstName: string;
  lastName: string;
  initial: string;
  dateOfBirth: Date;
  natioIdCard: string;
  availability: any;
  companyName: string;
  impartialityContract: string;
  privacyContract:string
  user: any;
  contractList: any;
  medicalVisitList: Array<MedicalVisit>;
  handedOverList: Array<HandedOver>;
  serviceList: Array<Service>;
  processList: Array<Process>;
  site: Site;
  eapList: Array<Eap>;
  employeeFormationList: Array<EmployeeFormation>;
  employeeDiplomaList: Array<EmployeeDiploma>;
  employeeAttributionList: Array<EmployeeAttribution>;
  civilState: CivilState;
  typeOfStaff: TypeOfStaff;

}
