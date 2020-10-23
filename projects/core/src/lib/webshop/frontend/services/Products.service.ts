import { Injectable } from '@angular/core';
import { ApiService } from '../../../general/services/Api.service';
import { Observable } from 'rxjs';
import { endPoints } from '../endpoints';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    get<RES>(): Observable<RES> {
        return this.apiService.get<RES>(endPoints.products.get);
    }

    constructor(
        private apiService: ApiService
    ) { }

}
