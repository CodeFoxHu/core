import { Injectable } from '@angular/core';
import { ApiService } from '../../../general/services/Api.service';
import { Observable } from 'rxjs';
import { endPoints } from '../endpoints';

@Injectable({
    providedIn: 'root'
})
export class PagesService {

    get<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.pages.get, body);
    }

    getFaq<RES>(): Observable<RES> {
        return this.apiService.get<RES>(endPoints.pages.getFaq);
    }

    constructor(
        private apiService: ApiService
    ) { }

}
