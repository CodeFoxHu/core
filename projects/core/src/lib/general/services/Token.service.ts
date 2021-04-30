import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoggerService } from './Logger.service';

export enum TokenServiceMode {
    LOCALSTORAGE = 0,
    SESSIONSTORAGE = 1,
    COOKIE = 2
}

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private _cookiePath: string = null;
    private _accessToken: string = null;
    private _accessTokenKey = 'acccessToken';
    private _accessTokenCookieExpireDays = 30;

    public set cookiePath(cookiePath: string) {
        this._cookiePath = cookiePath;
    }

    public get cookiePath(): string {
        return this._cookiePath;
    }

    public set accessToken(accessToken: string) {
        this._accessToken = accessToken;
    }

    public get accessToken(): string {
        return this._accessToken;
    }

    public set accessTokenKey(accessTokenKey: string) {
        this._accessTokenKey = accessTokenKey;
    }

    public get accessTokenKey(): string {
        return this._accessTokenKey;
    }

    public set accessTokenCookieExpireDays(accessTokenCookieExpireDays: number) {
        this._accessTokenCookieExpireDays = accessTokenCookieExpireDays;
    }

    public get accessTokenCookieExpireDays(): number {
        return this._accessTokenCookieExpireDays;
    }

    public write(mode: TokenServiceMode): void {
        if (this._accessToken === null) {
            return;
        }
        switch (mode) {
            case TokenServiceMode.LOCALSTORAGE:
                localStorage.setItem(this._accessTokenKey, this._accessToken);
                this.loggerService.debug('TOKEN SET TO LOCAL STORAGE: ' + this._accessToken);
                break;
            case TokenServiceMode.SESSIONSTORAGE:
                sessionStorage.setItem(this._accessTokenKey, this._accessToken);
                this.loggerService.debug('TOKEN SET TO SESSION STORAGE: ' + this._accessToken);
                break;
            case TokenServiceMode.COOKIE:
                this.cookieService.set(this._accessTokenKey, this._accessToken, this._accessTokenCookieExpireDays, this._cookiePath);
                this.loggerService.debug('TOKEN SET TO COOKIE: ' + this._accessToken);
                break;
        }
    }

    public read(mode: TokenServiceMode): string {
        switch (mode) {
            case TokenServiceMode.LOCALSTORAGE: return localStorage.getItem(this._accessTokenKey);
            case TokenServiceMode.SESSIONSTORAGE: return sessionStorage.getItem(this._accessTokenKey);
            case TokenServiceMode.COOKIE: {
                const cookieAccessToken: string = this.cookieService.get(this._accessTokenKey);
                return cookieAccessToken !== '' ? cookieAccessToken : null;
            }
            case null:
                return this.read(TokenServiceMode.LOCALSTORAGE) || this.read(TokenServiceMode.SESSIONSTORAGE) || this.read(TokenServiceMode.COOKIE);
        }
    }

    public delete(mode: TokenServiceMode): void {
        switch (mode) {
            case TokenServiceMode.LOCALSTORAGE:
                this.loggerService.debug('TOKEN DELETED FROM LOCAL STORAGE');
                localStorage.removeItem(this._accessTokenKey);
                break;
            case TokenServiceMode.SESSIONSTORAGE:
                this.loggerService.debug('TOKEN DELETED FROM SESSION STORAGE');
                sessionStorage.removeItem(this._accessTokenKey);
                break;
            case TokenServiceMode.COOKIE: {
                this.loggerService.debug('TOKEN DELETED FROM COOKIE');
                this.cookieService.delete(this._accessTokenKey);
                break;
            }
            case null:
                this.delete(TokenServiceMode.LOCALSTORAGE);
                this.delete(TokenServiceMode.SESSIONSTORAGE);
                this.delete(TokenServiceMode.COOKIE);
                break;
        }
        this._accessToken = null;
    }

    readAccesssToken(): void {
        this._accessToken = this.read(null);
        if (this._accessToken !== null) {
            this.loggerService.debug('TOKEN FOUND: ' + this._accessToken);
        }
    }

    constructor(
        private cookieService: CookieService,
        private loggerService: LoggerService
    ) { }

}
