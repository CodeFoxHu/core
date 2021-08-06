import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LogLevel } from './enums';
import { TokenService } from './services/Token.service';

interface Settings {
    errorInterceptorCallbackfunction: (httpErrorResponse: HttpErrorResponse) => void;
    mockInterceptorCallbackFunction: (request: HttpRequest<any>, requestUrl: URL, next: HttpHandler) => Observable<HttpEvent<any>>;
    loggedInTokenGuardNavigationCommands: string[];
    loggedInTokenGuardCallbackFunction: (tokenService: TokenService, router: Router) => boolean | UrlTree;
    loggedOutTokenGuardNavigationCommands: string[];
    loggedOutTokenGuardCallbackFunction: (tokenService: TokenService, router: Router) => boolean | UrlTree;
    apiServiceApiBaseUrl: string;
    loggerServiceLogLevel: LogLevel;
    precheckInterceptorPrecheck: 'ERROR' | 'WARNING';
    currency: string;
    interceptorTypes: string[],
    skipInterceptors: string[];
}

export let SETTINGS: Settings = {
    errorInterceptorCallbackfunction: null,
    mockInterceptorCallbackFunction: null,
    loggedInTokenGuardNavigationCommands: ['login'],
    loggedInTokenGuardCallbackFunction: (tokenService: TokenService, router: Router) => {
        const token: string = tokenService.accessToken;
        if (token !== null) {
            return true;
        }
        return router.createUrlTree(SETTINGS.loggedInTokenGuardNavigationCommands);
    },
    loggedOutTokenGuardNavigationCommands: ['/'],
    loggedOutTokenGuardCallbackFunction: (tokenService: TokenService, router: Router) => {
        const token: string = tokenService.accessToken;
        if (token === null) {
            return true;
        }
        return router.createUrlTree(SETTINGS.loggedOutTokenGuardNavigationCommands);
    },
    apiServiceApiBaseUrl: null,
    loggerServiceLogLevel: LogLevel.All,
    precheckInterceptorPrecheck: null,
    currency: 'ft',
    interceptorTypes: ['ERROR', 'LOADER', 'LOCK', 'MOCK', 'TOKEN', 'PRECHECK'],
    skipInterceptors: []
};
