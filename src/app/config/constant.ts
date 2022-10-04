// Angular Modules
import {Injectable} from '@angular/core';

@Injectable()
export class Constants {
  public readonly API_ENDPOINT: string = 'http://localhost:8082/ged/';
  public readonly API_EMPLOYE: string = this.API_ENDPOINT + 'employee/';
  public readonly API_USER: string = this.API_ENDPOINT + 'user/';
  public readonly API_AUTH: string = this.API_ENDPOINT + 'auth/';
  public readonly API_FORMATION: string = this.API_ENDPOINT + 'formation/';
  public readonly API_DIPLOME: string = this.API_ENDPOINT + 'diploma/';
  public readonly API_CIVILSTATE: string = this.API_ENDPOINT + 'civilState/';
  public readonly API_MEDICALVISIT: string = this.API_ENDPOINT + 'medicalVisit/';
  public readonly API_SITE: string = this.API_ENDPOINT + 'site/';
  public readonly API_ROLE: string = this.API_ENDPOINT + 'role/';
  public readonly API_ATTRIBUTION: string = this.API_ENDPOINT + 'attribution/';
  public readonly API_MATERIAL: string = this.API_ENDPOINT + 'material/';
}
