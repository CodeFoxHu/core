import { PersonalData, Address, NewsletterData, OrderHistoryItem } from './Webshop.interfaces';

export interface GetProfileRequest {
    type: 'personal'|'addresses'|'orders'|'order'|'newsletter';
    orderId?: number;
}

export interface GetProfilePersonalDataResponse {
    personalData: PersonalData[];
}

export interface UpdateProfilePersonalDataRequest {
    field: string;
    value: string;
}

export interface ChangePasswordRequest {
    password: string;
    passwordRepeat: string;
}

export interface GetProfileAddressesResponse {
    addresses: Address[];
}

export interface CreateAddressRequest {
    address: Address;
}

export interface CreateAddressResponse {
    id: number;
}

export interface UpdateAddressRequest {
    address: Address;
}

export interface GetNewsletterDataResponse {
    newsletterData: NewsletterData[];
}

export interface SetNewsletterDataStateRequest {
    field: string;
    checked: boolean;
}


export interface GetOrderHistoryRequest {
    start: number;
    count: number;
}

export interface GetOrderHistoryResponse {
    orders: OrderHistoryItem[];
    maxCount: number;
}

export interface GetOrderHistoryItemDetailsResponse {
    orderHistoryItem: OrderHistoryItem;
}
