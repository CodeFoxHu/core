import { Injectable } from '@angular/core';
import { ApiService } from '../../../general/services/Api.service';
import { Observable } from 'rxjs';
import { endPoints } from '../endpoints';

@Injectable({
    providedIn: 'root'
})
export class PaymentsService {

    start<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.payments.start, body);
    }

    check<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.payments.check, body);
    }

    constructor(
        private apiService: ApiService
    ) { }

}
