import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LockService, SendLock } from '../services/Lock.service';
import { LoggerService } from '../services/Logger.service';
import { skipInterceptor } from '../helpers/interceptors.helper';

@Injectable({
  providedIn: 'root'
})
export class LockInterceptor implements HttpInterceptor {
  constructor(
    private lockService: LockService,
    private loggerService: LoggerService
  ) {
    this.loggerService.info('Lock Interceptor inited');
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (skipInterceptor('LOCK')) {
        return next.handle(request);
    }
    const sendLock: SendLock = this.lockService.sendLock;
    if (sendLock !== null) {
        request = request.clone({
          setHeaders: {
            'Lock-Module': `${sendLock.module}`,
            'Lock-Id': `${sendLock.id}`
          }
        });
    }
    return next.handle(request);
  }
}
