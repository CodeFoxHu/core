import { Injectable } from '@angular/core';
import { ApiService } from '../../../general/services/Api.service';
import { Observable } from 'rxjs';
import { endPoints } from '../endpoints';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    sendMessage<REQ>(body: REQ): Observable<{}> {
        return this.apiService.post<{}>(endPoints.contact.sendMessage, body);
    }

    constructor(
        private apiService: ApiService
    ) { }

}
