import { Injectable } from '@angular/core';
import { ApiService } from '../../../general/services/Api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    getHomeEndPoint = 'home/get';

    get<RES>(): Observable<RES> {
        return this.apiService.get<RES>(this.getHomeEndPoint);
    }

    constructor(
        private apiService: ApiService
    ) { }

}
