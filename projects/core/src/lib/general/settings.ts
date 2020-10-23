import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './services/Token.service';

interface Settings {
    errorInterceptorCallbackfunction: (httpErrorResponse: HttpErrorResponse) => void;
    mockInterceptorCallbackFunction: (request: HttpRequest<any>, requestUrl: URL, next: HttpHandler) => Observable<HttpEvent<any>>;
    loggedInTokenGuardNavigationCommands: string[];
    loggedInTokenGuardCallbackFunction: (tokenService: TokenService, router: Router) => boolean | UrlTree;
    loggedOutTokenGuardNavigationCommands: string[];
    loggedOutTokenGuardCallbackFunction: (tokenService: TokenService, router: Router) => boolean | UrlTree;
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
    }
};
