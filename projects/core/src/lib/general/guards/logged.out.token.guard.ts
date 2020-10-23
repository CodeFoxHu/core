import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SETTINGS } from '../settings';
import { LoggerService } from '../services/Logger.service';
import { TokenService } from '../services/Token.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedOutTokenGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private loggerService: LoggerService,
        private router: Router
    ) { }
    canActivate(): boolean | UrlTree {
        this.loggerService.info('Logged Out Token Guard Callback Function Called');
        return SETTINGS.loggedOutTokenGuardCallbackFunction(this.tokenService, this.router);
    }
}
