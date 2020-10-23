import { Injectable } from '@angular/core';
import { ApiService } from '../../../general/services/Api.service';
import { Observable } from 'rxjs';
import { endPoints } from '../endpoints';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    login<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.customer.login, body);
    }

    logout<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.customer.logout, body);
    }

    registration<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.customer.registration, body);
    }

    forgottenPassword<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.customer.forgottenPassword, body);
    }

    changePassword<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.customer.changePassword, body);
    }

    resetPassword<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.customer.resetPassword, body);
    }

    destroySessions<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.customer.destroySessions, body);
    }

    comfirmEmail<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.customer.confirmEmail, body);
    }

    comfirmSubscribe<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.customer.confirmSubscribe, body);
    }

    subscribe<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.customer.subscribe, body);
    }

    unsubscribe<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.customer.unsubscribe, body);
    }

    createAddress<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.customer.createAddress, body);
    }

    deleteAddress<RES>(): Observable<RES> {
        return this.apiService.delete<RES>(endPoints.customer.deleteAddress);
    }

    updateAddress<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.patch<RES>(endPoints.customer.updateAddress, body);
    }

    updateProfileData<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.patch<RES>(endPoints.customer.updateProfileData, body);
    }

    constructor(
        private apiService: ApiService
    ) { }

}
