import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from '../services/Logger.service';
import { skipInterceptor } from '../helpers/interceptors.helper';
import { map } from 'rxjs/operators';
import { LockService } from '../services/Lock.service';
import { Lock, LockAction, LockHeaders } from '../interfaces/lock.interfaces';

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
    const lock: Lock = this.lockService.getLock();
    if (lock !== null) {
      const lockHeaders: LockHeaders = this.lockService.convertLockToHeaders(lock);
      if (lockHeaders !== null) {
        request = request.clone({
          setHeaders: lockHeaders
        });
      }
    }
    return next.handle(request).pipe(map((httpEvent: HttpEvent<any>) => {
      if (httpEvent.type === HttpEventType.Response && httpEvent.status === 200) {
        const action: string | null = httpEvent.headers.get('Lock-Action');
        const module: string | null = httpEvent.headers.get('Lock-Module');
        const id: string | null = httpEvent.headers.get('Lock-Id');
        const username: string | null = httpEvent.headers.get('Lock-Username');
        const userid: string | null = httpEvent.headers.get('Lock-Userid');
        if (action !== null && (action === LockAction.KEEP || action === LockAction.LOCK || action === LockAction.RELEASE) && module !== null && id !== null && username !== null && userid !== null) {
          this.lockService.setLockResponse({action, module, id, username, userid});
        }
      }
      return httpEvent;
    }));
  }
}
