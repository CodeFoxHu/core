import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from '../services/Logger.service';
import { SETTINGS } from '../settings';

@Injectable({
    providedIn: 'root'
})
export class Mockinterceptor implements HttpInterceptor {
    constructor(
        private loggerService: LoggerService
    ) {
        this.loggerService.info('Mock Interceptor inited');
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (SETTINGS.mockInterceptorCallbackFunction !== null) {
            this.loggerService.info('Mock Interceptor Callback Function Called [' + request.url + ']');
            return SETTINGS.mockInterceptorCallbackFunction(request, new URL(request.url), next);
        }
        return next.handle(request);
    }
}
