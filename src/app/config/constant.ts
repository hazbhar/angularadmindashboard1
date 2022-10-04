// Angular Modules
import { Injectable } from '@angular/core';
@Injectable()
export class Constants {
    public readonly API_ENDPOINT: string = 'http://localhost:8082/ged/';

    public readonly API_EMPLOYE: string = this.API_ENDPOINT+'employe/';

    public readonly API_USER: string = this.API_ENDPOINT+'user/';

    public readonly API_AUTH: string = this.API_ENDPOINT+'auth/';

    public readonly API_Frequence: string = this.API_ENDPOINT+'frequence/';

    public readonly API_Role: string = this.API_ENDPOINT+'role/';

    public readonly API_Site: string = this.API_ENDPOINT+'site/';

    public readonly API_contractType: string = this.API_ENDPOINT+'contractType/';

    public readonly API_FORMATION: string = this.API_ENDPOINT+'formation/';
}
