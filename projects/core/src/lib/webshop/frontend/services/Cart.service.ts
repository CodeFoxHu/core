import { Injectable } from '@angular/core';
import { ApiService } from '../../../general/services/Api.service';
import { Observable } from 'rxjs';
import { endPoints } from '../endpoints';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    add<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.cart.add, body);
    }

    modify<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.cart.modify, body);
    }

    delete(): Observable<{}> {
        return this.apiService.delete<{}>(endPoints.cart.delete);
    }

    disableWarning(): Observable<{}> {
        return this.apiService.delete<{}>(endPoints.cart.disableWarning);
    }

    get<RES>(): Observable<RES> {
        return this.apiService.get<RES>(endPoints.cart.get);
    }

    activateCoupon<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.cart.activateCoupon, body);
    }

    inactivateCoupon(): Observable<{}> {
        return this.apiService.delete<{}>(endPoints.cart.inactivateCoupon);
    }

    order<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.cart.order, body);
    }

    constructor(
        private apiService: ApiService
    ) { }

}
