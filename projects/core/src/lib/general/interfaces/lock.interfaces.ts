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