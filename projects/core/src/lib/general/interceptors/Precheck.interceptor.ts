import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from '../services/Logger.service';
import { SETTINGS } from '../settings';

@Injectable({
  providedIn: 'root'
})
export class PrecheckInterceptor implements HttpInterceptor {
  constructor(
    private loggerService: LoggerService
  ) {
    this.loggerService.info('Precheck Interceptor inited');
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (SETTINGS.precheckInterceptorPrecheck !== null) {
      request = request.clone({
        setHeaders: {
          Precheck: SETTINGS.precheckInterceptorPrecheck
        }
      });
      SETTINGS.precheckInterceptorPrecheck = null;
    }
    return next.handle(request);
  }
}
