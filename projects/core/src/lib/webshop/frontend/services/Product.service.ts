import { Injectable } from '@angular/core';
import { ApiService } from '../../../general/services/Api.service';
import { Observable } from 'rxjs';
import { endPoints } from '../endpoints';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    get<RES>(): Observable<RES> {
        return this.apiService.get<RES>(endPoints.product.get);
    }

    addRating<REQ, RES>(body: REQ): Observable<RES> {
        return this.apiService.post<RES>(endPoints.product.addRating, body);
    }

    constructor(
        private apiService: ApiService
    ) { }

}
