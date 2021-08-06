import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from '../services/Logger.service';
import { SETTINGS } from '../settings';
import { skipInterceptor } from '../helpers/interceptors.helper';

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
    if (skipInterceptor('PRECHECK')) {
        return next.handle(request);
    }
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
