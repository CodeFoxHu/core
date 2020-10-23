import { Injectable } from '@angular/core';
import { ApiService } from '../../../general/services/Api.service';
import { Observable } from 'rxjs';
import { endPoints } from '../endpoints';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    getPersonalData<RES>(): Observable<RES> {
        return this.apiService.get<RES>(endPoints.profile.getPersonalData);
    }

    getAddresses<RES>(): Observable<RES> {
        return this.apiService.get<RES>(endPoints.profile.getAddresses);
    }

    getNewsletterData<RES>(): Observable<RES> {
        return this.apiService.get<RES>(endPoints.profile.newsletterData);
    }

    setNewsletterDataState<REQ>(body: REQ): Observable<{}> {
        return this.apiService.post<{}>(endPoints.profile.setNewsletterDataState, body);
    }

    updateProfilePersonalData<REQ>(body: REQ): Observable<{}> {
        return this.apiService.post<{}>(endPoints.profile.updateProfileData, body);
    }

    changePassword<REQ>(body: REQ): Observable<{}> {
        return this.apiService.post<{}>(endPoints.profile.changePassword, body);
    }

    destroySessions(): Observable<{}> {
        return this.apiService.delete<{}>(endPoints.profile.destroySessions);
    }

    deleteAddress(): Observable<{}> {
        return this.apiService.delete<{}>(endPoints.profile.deleteAddress);
    }

    createAddress<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.profile.createAddress, body);
    }

    updateAddress<REQ>(body: REQ): Observable<{}> {
        return this.apiService.patch<{}>(endPoints.profile.updateAddress, body);
    }

    getOrderHistory<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.profile.getOrderHistory, body);
    }

    getOrderHistoryItemDetails<RES>(): Observable<RES> {
        return this.apiService.get<RES>(endPoints.profile.getOrderHistoryItem);
    }

    constructor(
        private apiService: ApiService
    ) { }

}
