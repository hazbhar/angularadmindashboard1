// Angular Modules
import { Injectable } from '@angular/core';
@Injectable()
export class Constants {
    public readonly API_ENDPOINT: string = 'http://localhost:8082/ged/';

    public readonly API_EMPLOYE: string = this.API_ENDPOINT+'employee/';

    public readonly API_USER: string = this.API_ENDPOINT+'user/';

    public readonly API_AUTH: string = this.API_ENDPOINT+'auth/';

    public readonly API_FORMATION: string = this.API_ENDPOINT+'formation/';
}
