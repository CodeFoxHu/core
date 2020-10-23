import {
    OrderItem,
    NextQuantitativeDiscount,
    Coupon,
    Address,
    ShippingMethod,
    PaymentMethod,
    OrderExtra,
    PersonalData,
    OrderShippingMethod,
    OrderPaymentMethod,
    OrderRegistration
} from './Webshop.interfaces';

export interface AddRequest {
    type: 'PRODUCT'|'PACKAGE';
    code: string;
    quantity: number;
}

export interface AddResponse {
    orderItem: OrderItem;
}

export interface ModifyRequest {
    quantity: number;
}

export interface ModifyResponse {
    unitPrice: number;
    nextQuantitativeDiscount: NextQuantitativeDiscount;
}

export interface DeleteRequest {
    id: number;
}

export interface GetResponse {
    items: OrderItem[];
    coupon: Coupon;
    addresses: Address[];
    shippingMethods: ShippingMethod[];
    paymentMethods: PaymentMethod[];
    extras: OrderExtra[];
    personalData: PersonalData[];
    warningText: string;
}

export interface ActivateCouponRequest {
    code: string;
    email: string;
}

export interface ActivateCouponResponse {
    coupon?: Coupon;
    errorMessage?: string;
}

export interface OrderRequest {
    shippingAddress: Address;
    invoiceAddress: Address;
    orderShippingMethod: OrderShippingMethod;
    orderPaymentMethod: OrderPaymentMethod;
    extras: string[];
    personalDataInfo: { [key: string]: string };
    registration: OrderRegistration;
    note: string;
}

export interface OrderResponse {
    paymentType: 'CREDITCARD'|'CASHONDELIVERY';
    id: number;
}
