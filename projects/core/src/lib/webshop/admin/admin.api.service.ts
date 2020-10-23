import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../general/services/Api.service';
import { Configuration, TableRequest, UserData, UserGroup, User, UserLoginResponse, UserEditor } from './admin.interfaces';

@Injectable({
    providedIn: 'root'
})
export class WSAApiService {
    constructor(
        private apiService: ApiService
    ) { }

    setApiBaseUrl(apiBaseUrl: string): void {
        this.apiService.apiBaseUrl = apiBaseUrl;
    }

    readConfig(): Observable<Configuration> {
        return this.apiService.get('#' + window.location.origin + '/assets/config.json');
    }

    init(): Observable<{
        userData: UserData,
        sessionToken: string
    }> {
        return this.apiService.get('init');
    }

    login(request: {
        username: string,
        password: string,
        stayLoggedIn: boolean
    }): Observable<UserLoginResponse> {
        return this.apiService.post('user/login', request);
    }

    logout(): Observable<{}> {
        return this.apiService.delete('user/logout');
    }

    getUserGroups(request: TableRequest): Observable<{
        userGroups: UserGroup[],
        rowCount: number
    }> {
        if (request === null) {
            return this.apiService.get('usergroups');
        } else {
            return this.apiService.get('usergroups?request=' + JSON.stringify(request));
        }
    }

    getUsers(request: TableRequest): Observable<{
        users: User[],
        rowCount: number
    }> {
        return this.apiService.get('users?request=' + JSON.stringify(request));
    }

    createUser(request: UserEditor): Observable<{}> {
        return this.apiService.post('users', request);
    }

    updateUser(id: number, request: UserEditor): Observable<{}> {
        return this.apiService.patch('users/' + id, request);
    }

    getUser(id: number): Observable<{
        userEditor: UserEditor
    }> {
        return this.apiService.get('users/' + id);
    }
}
