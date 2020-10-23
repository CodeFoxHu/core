import { Injectable } from '@angular/core';
import { ApiService } from '../../../general/services/Api.service';
import { Observable } from 'rxjs';
import { endPoints } from '../endpoints';

@Injectable({
    providedIn: 'root'
})
export class HelpersService {

    getCitiesByPostalCode<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.helpers.getCitiesByPostalCode, body); // TODO: get but post???
    }

    getShippingCities<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.helpers.getShippingCities, body); // TODO: get but post???
    }

    getShippingPoints<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.helpers.getShippingPoints, body); // TODO: get but post???
    }

    constructor(
        private apiService: ApiService
    ) { }

}
