import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/Token.service';
import { LoggerService } from '../services/Logger.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private loggerService: LoggerService
  ) {
    this.loggerService.info('Token Interceptor inited');
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken: string = this.tokenService.accessToken;
    if (accessToken !== null) {
      request = request.clone({
        setHeaders: {
          Token: accessToken
        }
      });
    }
    return next.handle(request);
  }
}
