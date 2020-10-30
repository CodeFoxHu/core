import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../general/services/Api.service';
import {
    Configuration,
    TableRequest,
    UserData,
    UserGroup,
    User,
    UserLoginResponse,
    UserEditor,
    Permission,
    UserGroupEditor,
    CustomerGroup,
    CustomerGroupEditor,
    Customer,
    CustomerEditor
} from './admin.interfaces';

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

    getUserGroup(id: number): Observable<{
        userGroupEditor: UserGroupEditor
    }> {
        return this.apiService.get('usergroups/' + id);
    }

    createUserGroup(request: UserGroupEditor): Observable<{}> {
        return this.apiService.post('usergroups', request);
    }

    updateUserGroup(id: number, request: UserGroupEditor): Observable<{}> {
        return this.apiService.patch('usergroups/' + id, request);
    }

    deleteUserGroup(id: number): Observable<{}> {
        return this.apiService.delete('usergroups/' + id);
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

    getPermissions(): Observable<{
        permissions: Permission[]
    }> {
        return this.apiService.get('permissions');
    }

    getCustomerGroups(request: TableRequest): Observable<{
        customerGroups: CustomerGroup[],
        rowCount: number
    }> {
        return this.apiService.get('customergroups?request=' + JSON.stringify(request));
    }

    getCustomerGroup(id: number): Observable<{
        customerGroupEditor: CustomerGroupEditor
    }> {
        return this.apiService.get('customergroups/' + id);
    }

    createCustomerGroup(request: CustomerGroupEditor): Observable<{}> {
        return this.apiService.post('customergroups', request);
    }

    updateCustomerGroup(id: number, request: CustomerGroupEditor): Observable<{}> {
        return this.apiService.patch('customergroups/' + id, request);
    }

    deleteCustomerGroup(id: number): Observable<{}> {
        return this.apiService.delete('customergroups/' + id);
    }

    getCustomers(request: TableRequest): Observable<{
        customers: Customer[],
        rowCount: number
    }> {
        if (request === null) {
            return this.apiService.get('customers');
        } else {
            return this.apiService.get('customers?request=' + JSON.stringify(request));
        }
    }

    getCustomer(id: number): Observable<{
        customerEditor: CustomerEditor
    }> {
        return this.apiService.get('customers/' + id);
    }

    createCustomer(request: CustomerEditor): Observable<{}> {
        return this.apiService.post('customers', request);
    }

    updateCustomer(id: number, request: CustomerEditor): Observable<{}> {
        return this.apiService.patch('customers/' + id, request);
    }
}
