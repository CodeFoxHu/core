import { Injectable } from '@angular/core';
import { ApiService } from '../../../general/services/Api.service';
import { Observable } from 'rxjs';
import { endPoints } from '../endpoints';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    get<RES>(): Observable<RES> {
        return this.apiService.get<RES>(endPoints.categories.get);
    }

    check<RES>(): Observable<RES> {
        return this.apiService.get<RES>(endPoints.categories.menuLayout);
    }

    constructor(
        private apiService: ApiService
    ) { }

}
