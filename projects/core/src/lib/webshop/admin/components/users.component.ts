import { AfterViewInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { WSAApiService } from '../admin.api.service';
import { User } from '../admin.interfaces';

export class WSAUsersComponent implements OnDestroy, AfterViewInit {
    users: User[];
    rowCount = 0;
    loading = true;
    unsubscribe: Subject<void> = new Subject();
    @ViewChild('usersTable') usersTable: Table = null;
    constructor(
        private wsaApiService: WSAApiService,
        private changeDetection: ChangeDetectorRef
    ) { }
    loadUsers(event: any): void {
        this.loading = true;
        this.changeDetection.detectChanges();
        this.wsaApiService.getUsers(event).pipe(takeUntil(this.unsubscribe)).subscribe((rsp) => {
            this.users = rsp.users;
            this.rowCount = rsp.rowCount;
            this.loading = false;
        }).add(() => {
            this.changeDetection.detectChanges();
        });
    }
    ngAfterViewInit(): void {
        if (this.usersTable === undefined) {
            return;
        }
        this.usersTable.onLazyLoad.pipe(
            startWith(this.usersTable.createLazyLoadMetadata())
        ).subscribe((event) => {
            this.loadUsers(event);
        });
    }
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
