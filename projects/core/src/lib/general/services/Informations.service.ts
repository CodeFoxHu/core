import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Information, InformationTypes, ServerErrors } from '../../webshop/frontend/interfaces/Webshop.interfaces';

@Injectable({
    providedIn: 'root'
})
export class InformationsService {
    pushInfo: Subject<Information> = new Subject<Information>();
    pushInformation(text: string, type: InformationTypes = InformationTypes.ERROR, disableOnlyOnCLick: boolean = false): void {
        this.pushInfo.next({
            text,
            type,
            disableOnlyOnCLick
        });
    }
    pushErrors(errors: ServerErrors): void {
        if (errors !== undefined) {
            Object.keys(errors).forEach((errorKey) => {
                this.pushInformation(errors[errorKey]);
            });
        } else {
            this.pushInformation('informations.somethingwentwrong');
        }
    }
}
