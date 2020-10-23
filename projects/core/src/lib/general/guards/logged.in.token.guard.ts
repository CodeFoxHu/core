import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { TokenService } from '../services/Token.service';
import { SETTINGS } from '../settings';
import { LoggerService } from '../services/Logger.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedInTokenGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private loggerService: LoggerService,
        private router: Router
    ) { }
    canActivate(): boolean | UrlTree {
        this.loggerService.info('Logged In Token Guard Callback Function Called');
        return SETTINGS.loggedInTokenGuardCallbackFunction(this.tokenService, this.router);
    }
}
