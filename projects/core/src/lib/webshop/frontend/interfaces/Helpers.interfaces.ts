import { ShippingPoint } from './Webshop.interfaces';

export interface GetShippingCitiesRequest {
    type: string;
}

export interface GetShippingCitiesResponse {
    cities: string[];
}

export interface GetShippingPointsRequest {
    type: string;
    city: string;
}

export interface GetShippingPointsResponse {
    shippingPoints: ShippingPoint[];
}

export interface GetCitiesByPostalCodeRequest {
    country: string;
    postCode: string;
}

export interface GetCitiesByPostalCodeResponse {
    cities: string[];
}
