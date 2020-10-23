export interface Configuration {
    apiBaseUrl: string;
}

export interface UserData {
    username: string;
    fullname: string;
    modules: string[];
    permissions: string[];
}

export interface UserLoginResponse {
    userData: UserData;
}

export interface UserGroup {
    id: number;
    name: string;
}

export interface TableRequest {
    first: number;
    rows: number;
    sortOrder: number;
    sortField: string;
    filters: {[key: string]: {matchMode: string, value: string}};
}

export interface User {
    id: number;
    username: string;
    fullname: string;
    active: boolean;
}

export interface UserEditor {
    username: string;
    fullname: string;
    password: string;
    active: boolean;
    userGroups: number[];
}
