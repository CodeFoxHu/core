import { Injectable } from '@angular/core';

export interface SendLock {
    module: string;
    id: string;
}

@Injectable({
    providedIn: 'root'
})
export class LockService {

    private _sendLock: SendLock = null;

    public set sendLock(sendLock: SendLock) {
        this._sendLock = sendLock;
    }

    public get sendLock(): SendLock {
        const l: SendLock = this._sendLock;
        this._sendLock = null;
        return l;
    }
}
