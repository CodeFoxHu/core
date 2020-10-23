import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaderService } from '../services/Loader.service';
import { LoggerService } from '../services/Logger.service';

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
    requests: HttpRequest<any>[] = [];
    constructor(
        private loaderService: LoaderService,
        private loggerService: LoggerService
    ) {
        this.loggerService.info('Loader Interceptor inited');
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.pushRequest(request);
        return next.handle(request).pipe(
            map((httpEvent: HttpEvent<any>) => {
                this.removeRequest(request);
                return httpEvent;
            })
        );
    }
    pushRequest(request: HttpRequest<any>): void {
        this.loaderService.loading = true;
        this.requests.push(request);
    }
    removeRequest(request: HttpRequest<any>): void {
        const requestIndex: number = this.requests.indexOf(request);
        if (requestIndex !== -1) {
            this.requests.splice(requestIndex, 1);
        }
        this.loaderService.loading = this.requests.length !== 0;
    }
}
