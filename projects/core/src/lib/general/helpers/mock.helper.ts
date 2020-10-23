import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoggerService } from '../services/Logger.service';

export interface MockRequestConfiguration {
    request: HttpRequest<any>;
    pathname: string;
    method: string;
    status: number;
    body: any;
    loggerService: LoggerService;
}

export function mockRequestPostOk(request: HttpRequest<any>, body: any, loggerService: LoggerService): Observable<HttpResponse<any>> {
    return mockRequestSimple({body, loggerService, request, status: 200});
}

export function mockRequestGetOk(request: HttpRequest<any>, body: any, loggerService: LoggerService): Observable<HttpResponse<any>> {
    return mockRequestSimple({body, loggerService, request, status: 200});
}

export function mockRequestDeleteOk(request: HttpRequest<any>, body: any, loggerService: LoggerService): Observable<HttpResponse<any>> {
    return mockRequestSimple({body, loggerService, request, status: 200});
}

export function mockRequestSimple(configuration: {
    request: HttpRequest<any>,
    status: number,
    body: any,
    loggerService: LoggerService
}): Observable<HttpResponse<any>> {
    configuration.loggerService.info('Request mocked [' + configuration.request.url + '] [' + JSON.stringify(configuration.body) + ']');
    return of(new HttpResponse({status: configuration.status, body: configuration.body}));
}
