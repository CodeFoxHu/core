export interface Address {
    id: number;
    contactName: string;
    contactPhone: string;
    country: string;
    postCode: string;
    city: string;
    address: string;
    note: string;
    invoice: boolean;
    shipping: boolean;
    companyName: string;
    companyTaxNumber: string;
}

export interface AddressGroup {
    type: string;
    addresses: Address[];
}

export interface FaqGroup {
    id: number;
    title: string;
    icon: string;
    items: FaqItem[];
}

export interface FaqItem {
    id: number;
    title: string;
    text: string;
    opened?: boolean;
}

export interface OrderItem {
    type: 'product'|'package';
    product?: ProductInfo;
    package?: PackageInfo;
    quantity: number;
    price: number;
    id: number;
    unit: string;
    nextQuantitativeDiscount: NextQuantitativeDiscount;
}

export interface ProductInfo {
    code: string;
    name: string;
    categories: Category[];
    rating: number;
    price: number;
    finalPrice: number;
    salePrice: number;
    salePercent: number;
    images: string[];
    url: string;
    quantity?: number;
    recommendedPackages: PackageInfo[];
    brand?: string;
    weight?: number;
    // dateOfArrival: string; TODO: disguss
    unitSale?: number;
    unit?: string;
    description?: string;
    tags?: string[];
    isNew?: boolean;
    lastTimeBuy?: boolean;
    status?: string; // ENUM
    quantitativeDiscount?: QuantitativeDiscountItem[];
    comments?: CommentItem[];
    ratings?: number[];
    videoId?: string;
    tax: number;
    availability: 'IN_STOCK'|'OUT_OF_STOCK'|'PREORDER';
    warrantyBanner: string;
}

export interface Category {
    id: number;
    name: string;
    url: string;
    subCategories?: Category[];
    color?: string;
}

export interface NextQuantitativeDiscount {
    quantity: number;
    price: number;
}

export interface CommentItem {
    rating: number;
    userName: string;
    date: string;
    text: string;
}

export interface QuantitativeDiscountItem {
    quantity: number;
    price: number;
}

export interface PackageInfo {
    products: ProductInfo[];
    price: number;
    salePrice: number;
    salePercent: number;
    id: number;
}

export interface Coupon {
    title: string;
    type: 'value'|'percent';
    value: number;
    expireDate: string;
    minimumCartValue: number;
    couponType: string;
    code: string;
}

export interface ShippingMethod {
    type: string;
    title: string;
    price: number;
    needAddress: boolean;
}

export interface PaymentMethod {
    type: string;
    title: string;
    price: number;
    isCreditCard: boolean;
    info: string;
}

export interface OrderExtra {
    type: string;
    title: string;
    info: string;
    price: number;
}

export interface PersonalData {
    field: string;
    icon: string;
    value: string;
    readonly: boolean;
}

export interface OrderShippingMethod {
    type: string;
    pointId?: number;
}

export interface OrderPaymentMethod {
    type: string;
}

export interface OrderRegistration {
    registration: boolean;
    password: string;
    password_repeat: string;
    newsletter: boolean;
}

export interface PersonalDataInfo { // TODO: [key: string]: value
    field: string;
    value: string;
}

export interface ShippingPoint {
    id: number;
    name: string;
    address: string;
    city: string;
    phone: string;
    lat: string;
    lon: string;
    openingHours: any;
}

export interface CIBSpi {
    trid: string;
    amo: number;
    rc: string;
    rt: string;
    anum: string;
}

export enum InformationTypes {
    SUCCESS = 0,
    ERROR = 1
}

export interface Information {
    type: InformationTypes;
    text: string;
    disableOnlyOnCLick: boolean;
}

export interface ServerErrors {
    [key: string]: string;
}

export enum ButtonType {
    GRAY = 'gray',
    GREEN = 'green',
    RED = 'red',
    BLUE = 'blue',
    WHITE = 'white'
}

export interface WebshopSettings {
    currency: string;
    lang: string;
    dateFormat: string;
    timeFormat: string;
    thousandSeparator: string;
    decimalSeparator: string;
    decimalDigits: number;
    currencyBefore: boolean;
    currencySpace: boolean;
    shippingLimitedTo: string;
    name: string;
    headerFullWidth: boolean;
    fullBodyBackground: string;
}

export interface NewsletterData {
    field: string;
    checked: boolean;
    title: string;
}

export interface OrderHistoryItem {
    amount: number;
    coupon: Coupon;
    email: string;
    extras: OrderExtra[];
    invoiceAddress: Address;
    invoices: Invoice[];
    items: OrderHistoryDetailItem[];
    name: string;
    note: string;
    orderDate: string;
    orderId: number;
    payed: boolean;
    paymentMethod: PaymentMethod;
    phone: string;
    shippingAddress: Address;
    shippingMethod: OrderHistoryShippingMethod;
    status: string;
    statusDate: string;
    trackingNumber: string;
    transactionInProgress: boolean;
    transactions: Transaction[];
    showDetails?: boolean;
    detailsLoading?: boolean;
    detailsLoaded?: boolean;
}

export interface Invoice {
    invoiceNumber: string;
    url: string;
}

export interface Transaction {
    way: 'IN'|'OUT';
    rc: string;
    trid: string;
    date: string;
    text: string;
    amount: number;
}

export interface OrderHistoryShippingMethod {
    type: string;
    title: string;
    price: number;
}

export interface OrderHistoryDetailItem {
    code: string;
    name: string;
    price: number;
    images: string[];
    url: string;
    quantity: number;
    unit: string;
    status: string;
    tax: number;
}
