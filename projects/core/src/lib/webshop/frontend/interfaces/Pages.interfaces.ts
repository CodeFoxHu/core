import { FaqGroup } from './Webshop.interfaces';

export interface GetFaqResponse {
    groups: FaqGroup[];
}

export interface GetPageRequest {
    slug: string;
}

export interface GetPageResponse {
    page: Page;
}

export interface Page {
    title: string;
    type: 'OUTER'|'INNER';
    content: string;
    url: string;
}
