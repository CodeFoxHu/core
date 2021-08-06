import { SETTINGS } from "../settings";

export function skipInterceptor(interceptorType: string): boolean {
    if (SETTINGS.skipInterceptors.indexOf('ALL') !== -1) {
        return true;
    }
    return SETTINGS.skipInterceptors.indexOf(interceptorType) !== -1;
}