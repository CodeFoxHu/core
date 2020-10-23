import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../services/Logger.service';
import { SETTINGS } from '../settings';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private loggerService: LoggerService
    ) {
        this.loggerService.info('Error Interceptor inited');
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((httpErrorResponse: HttpErrorResponse) => {
                if (SETTINGS.errorInterceptorCallbackfunction !== null) {
                    this.loggerService.info('Error Interceptor Callback Function Called');
                    SETTINGS.errorInterceptorCallbackfunction(httpErrorResponse);
                }
                return throwError(httpErrorResponse);
            })
        );
    }
}
