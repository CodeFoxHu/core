import { Injectable } from '@angular/core';
import { ApiService } from '../../../general/services/Api.service';
import { Observable } from 'rxjs';
import { endPoints } from '../endpoints';
import { WebshopSettings } from '../interfaces/Webshop.interfaces';

@Injectable({
    providedIn: 'root'
})
export class InitService {

    webshopSettings: WebshopSettings = null;

    init<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.init.init, body);
    }

    constructor(
        private apiService: ApiService
    ) { }

}
