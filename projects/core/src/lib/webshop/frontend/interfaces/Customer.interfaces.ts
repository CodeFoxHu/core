import { Address } from './Webshop.interfaces';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    fullname: string;
    accessToken: string;
}

export interface RegistrationRequest {
    email: string;
    password: string;
    passwordRepeat: string;
    gdpr: boolean;
}

export interface ChangePasswordRequest {
    password: string;
    passwordRepeat: string;
}

export interface ForgottenPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    password: string;
    passwordRepeat: string;
    token: string;
}

export interface ConfirmEmailRequest {
    token: string;
}

export interface ConfirmSubscribeRequest {
    token: string;
}

export interface SubscribeRequest {
    email: string;
}

export interface SubscribeResponse {
    status: string;
}

export interface UnsubscribeRequest {
    token: string;
}

export interface CreateAddressRequest {
    address: Address;
}

export interface CreateAddressResponse {
    id: number;
}

export interface DeleteAddressRequest {
    id: number;
}

export interface UpdateAddressRequest {
    address: Address;
}

export interface UpdateProfileDataRequest {
    field: string;
    value: string;
}
