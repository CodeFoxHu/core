import { CIBSpi } from './Webshop.interfaces';

export interface StartPaymentRequest {
    orderId: number;
}

export interface StartPaymentResponse {
    payed: boolean;
    transactionInProgress: boolean;
    paymentError: boolean;
    paymentUrl?: string;
}

export interface CheckPaymentRequest {
    query: string;
}

export interface CheckPaymentResponse {
    CIBSpi: CIBSpi;
    orderId: number;
}
