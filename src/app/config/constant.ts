// Angular Modules
import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
  public readonly API_ENDPOINT: string = 'http://localhost:8082/ged/';

  public readonly API_EMPLOYE: string = this.API_ENDPOINT + 'employee/';

  public readonly API_USER: string = this.API_ENDPOINT + 'user/';

  public readonly API_AUTH: string = this.API_ENDPOINT + 'auth/';

  public readonly API_Frequence: string = this.API_ENDPOINT + 'frequence/';

  public readonly API_Role: string = this.API_ENDPOINT + 'role/';

  public readonly API_Site: string = this.API_ENDPOINT + 'site/';

  public readonly API_contractType: string =
    this.API_ENDPOINT + 'contractType/';

  public readonly API_FORMATION: string = this.API_ENDPOINT + 'formation/';

  public readonly API_DIPLOME: string = this.API_ENDPOINT + 'diploma/';

  public readonly API_PERSOTYP: string = this.API_ENDPOINT + 'typeofstaff/';

  public readonly API_Service: string = this.API_ENDPOINT + 'service/';

  public readonly API_EtatCivil: string = this.API_ENDPOINT + 'civilState/';

  public readonly API_Privilege: string = this.API_ENDPOINT + 'privilege/';

  public readonly API_Process: string = this.API_ENDPOINT + 'process/';

  public readonly API_UploadFile: string = this.API_ENDPOINT + 'upload/';

  public readonly API_Contrat: string = this.API_ENDPOINT + 'contract/';

  public readonly API_Attrub: string = this.API_ENDPOINT + 'attribution/';

  public readonly API_Eap: string = this.API_ENDPOINT + 'eap/';

  public readonly API_MedVis: string = this.API_ENDPOINT + 'medicalVisit/';
  public readonly API_Habili: string = this.API_ENDPOINT + '/';


}
