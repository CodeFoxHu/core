import { Injectable } from '@angular/core';
import { LogLevel } from '../enums';
import { SETTINGS } from '../settings';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    private _logLevel: LogLevel = null;

    private logLevelColors: string[] = [
        '',
        'background-color: #D2BDF3; padding: 5px 10px;',
        'background-color: #A2DDFF; padding: 5px 10px;',
        'background-color: #FFD5C5; padding: 5px 10px;',
        'background-color: #EA4331; color: #FFFFFF; padding: 5px 10px;',
        'background-color: #F71900; color: #FFFFFF; padding: 5px 10px;',
        ''
    ];

    public debug(log: any, group: boolean = false): void {
        this.log({log, logLevel: LogLevel.Debug, group});
    }

    public info(log: any, group: boolean = false): void {
        this.log({log, logLevel: LogLevel.Info, group});
    }

    public warn(log: any, group: boolean = false): void {
        this.log({log, logLevel: LogLevel.Warn, group});
    }

    public error(log: any, group: boolean = false): void {
        this.log({log, logLevel: LogLevel.Error, group});
    }

    public fatal(log: any, group: boolean = false): void {
        this.log({log, logLevel: LogLevel.Fatal, group});
    }

    public groupEnd(): void {
        console.groupEnd();
    }

    private log(configuration: {
        log: any,
        logLevel: LogLevel,
        group: boolean
    }): void {
        if (this._logLevel === LogLevel.Off || this._logLevel > configuration.logLevel) {
            return;
        }
        if (configuration.group) {
            console.group(configuration.log);
        } else {
            console.log('%c' + configuration.log, this.logLevelColors[configuration.logLevel]);
        }
    }

    set logLevel(logLevel: LogLevel) {
        this._logLevel = logLevel;
    }

    get logLevel(): LogLevel {
        return this._logLevel;
    }

    constructor() {
        this.logLevel = SETTINGS.loggerServiceLogLevel;
    }
}
