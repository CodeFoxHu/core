export interface GetProductResponse {
    product: any; // TODO: ???
    reviewed: boolean;
}

export interface ProductAddRatingRequest {
    code: string;
    rating: number;
    comment: string;
}

