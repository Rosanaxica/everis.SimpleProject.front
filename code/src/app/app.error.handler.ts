import {Response} from '@angular/http';
import { Observable } from 'rxjs';

export class ErrorHandler {
    static handleError(error: Response | any) {
        let errorMessege: string;

        if (error instanceof Response) {
            errorMessege = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`;
        } else {
            errorMessege = error.toString();
        }

        return Observable.throw(errorMessege);
        }
}
