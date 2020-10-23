import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    _loading = false;
    set loading(loading: boolean) {
        this._loading = loading;
    }
    get loading(): boolean {
        return this._loading;
    }
}
