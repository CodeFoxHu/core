import { Injectable } from '@angular/core';
import { LoggerService } from './Logger.service';

export enum LockAction {
    LOCK = 'LOCK',
    KEEP = 'KEEP',
    RELEASE = 'RELEASE'
}

export interface Lock {
    action: LockAction;
    module: string;
    id: string;
}

export type LockHeaders = {[name: string]: string};

export interface LockResponse {
    action: LockAction;
    module: string;
    id: string;
    username: string;
    userid: string;
}

@Injectable({
    providedIn: 'root'
})
export class LockService {

    constructor(
        private loggerService: LoggerService
    ) { }

    private _lockResponse: LockResponse | null = null;

    public setLockResponse(lockResponse: LockResponse | null): void {
        this.loggerService.info(`[LOCK] SETLOCKRESPONSE; RESPONSE: ${JSON.stringify(lockResponse)}`);
        if (lockResponse === null) {
            this._lockResponse = null;
        } else {
            this._lockResponse = {...lockResponse};
        }
    }

    public getLockResponse(): LockResponse | null {
        let lockResponse: LockResponse | null = null;
        if (this._lockResponse !== null) {
            lockResponse = {...this._lockResponse};
            this.setLockResponse(null);
        }
        return lockResponse;
    }

    private _lock: Lock = null;

    public getLock(): Lock {
        return this._lock;
    }

    public lock(module: string, id: string): void {
        this.loggerService.info(`[LOCK] ACTION: LOCK; MODULE: ${module}; ID: ${id}`);
        this._lock = {
            action: LockAction.LOCK,
            module,
            id
        }
    }

    public keep(module: string, id: string): void {
        this.loggerService.info(`[LOCK] ACTION: KEEP; MODULE: ${module}; ID: ${id}`);
        this._lock = {
            action: LockAction.KEEP,
            module,
            id
        }
    }

    public release(module: string, id: string): void {
        this.loggerService.info(`[LOCK] ACTION: RELEASE; MODULE: ${module}; ID: ${id}`);
        this._lock = {
            action: LockAction.RELEASE,
            module,
            id
        }
    }

    public convertLockToHeaders(lock: Lock | null): LockHeaders {
        if (lock === null) {
            return null;
        }
        return {
            'Lock-Action': `${lock.action}`,
            'Lock-Module': `${lock.module}`,
            'Lock-Id': `${lock.id}`
        };
    }
}
