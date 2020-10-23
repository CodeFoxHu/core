import { Injectable } from '@angular/core';

export enum LogLevel {
    All = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    Fatal = 5,
    Off = 6
}

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    private _logLevel: LogLevel = LogLevel.All;

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

    public setLogLevel(logLevel: LogLevel): void {
        this.logLevel = logLevel;
    }

    set logLevel(logLevel: LogLevel) {
        this._logLevel = logLevel;
    }

    get logLevel(): LogLevel {
        return this._logLevel;
    }
}
