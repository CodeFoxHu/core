import { Injectable } from '@angular/core';
import { UserData } from './admin.interfaces';

@Injectable({
    providedIn: 'root'
})
export class WSAUserService {
    _userData: UserData = null;
    set userData(userData: UserData) {
        this._userData = userData;
    }
    get userData(): UserData {
        return this._userData;
    }
}
