import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from '../services/Logger.service';
import { SETTINGS } from '../settings';
import { skipInterceptor } from '../helpers/interceptors.helper';

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
        if (skipInterceptor('MOCK')) {
            return next.handle(request);
        }
        if (SETTINGS.mockInterceptorCallbackFunction !== null) {
            this.loggerService.info('Mock Interceptor Callback Function Called [' + request.url + ']');
            try {
                return SETTINGS.mockInterceptorCallbackFunction(request, new URL(request.url), next);
            } catch(e) {
                this.loggerService.error('Mock Interceptor Callback Invalid Callback [' + e + ']')
            }
        }
        return next.handle(request);
    }
}
