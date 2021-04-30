import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SETTINGS } from '../settings';
import { LoggerService } from '../services/Logger.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private _apiBaseUrl: string = null;

    public post<T>(endPoint: string, body: any): Observable<any> {
        return this.httpClient.post<T>(this.generateUrl(endPoint), body);
    }

    public get<T>(endPoint: string): Observable<any> {
        return this.httpClient.get<T>(this.generateUrl(endPoint));
    }

    public getFileArrayBuffer<T>(endPoint: string): Observable<ArrayBuffer> {
        return this.httpClient.get(this.generateUrl(endPoint), {
            responseType: 'arraybuffer'
        });
    }

    public getFileText<T>(endPoint: string): Observable<string> {
        return this.httpClient.get(this.generateUrl(endPoint), {
            responseType: 'text'
        });
    }

    public getWithHttpParams<T>(endPoint: string, params: HttpParams): Observable<any> {
        return this.httpClient.get<T>(this.generateUrl(endPoint), {
            params
        });
    }

    public delete<T>(endPoint: string): Observable<any> {
        return this.httpClient.delete<T>(this.generateUrl(endPoint));
    }

    public patch<T>(endPoint: string, body: any): Observable<any> {
        return this.httpClient.patch<T>(this.generateUrl(endPoint), body);
    }

    public head<T>(endPoint: string): Observable<any> {
        return this.httpClient.head<T>(this.generateUrl(endPoint));
    }

    public options<T>(endPoint: string): Observable<any> {
        return this.httpClient.options<T>(this.generateUrl(endPoint));
    }

    public put<T>(endPoint: string, body: any): Observable<any> {
        return this.httpClient.put<T>(this.generateUrl(endPoint), body);
    }

    private generateUrl(endPoint: string): string {
        if (endPoint.startsWith('#')) {
            return endPoint.slice(1);
        }
        return [this._apiBaseUrl, endPoint].join('/');
    }

    set apiBaseUrl(apiBaseUrl: string) {
        if (apiBaseUrl === null) {
            this.loggerService.error('Api Service base url set to: NULL');
        } else {
            this.loggerService.info('Api Service base url set to: ' + apiBaseUrl);
            if (apiBaseUrl[apiBaseUrl.length - 1] === '/') {
                apiBaseUrl = apiBaseUrl.slice(0, apiBaseUrl.length);
            }
        }
        this._apiBaseUrl = apiBaseUrl;
    }

    get apiBaseUrl(): string {
        return this._apiBaseUrl;
    }

    constructor(
        private httpClient: HttpClient,
        private loggerService: LoggerService
    ) {
        this.apiBaseUrl = SETTINGS.apiServiceApiBaseUrl;
    }
}
