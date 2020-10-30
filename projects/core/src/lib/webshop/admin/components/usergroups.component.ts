import { AfterViewInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { WSAApiService } from '../admin.api.service';
import { UserGroup } from '../admin.interfaces';
import { Table } from 'primeng/table';

export class WSAUserGroupsComponent implements OnDestroy, AfterViewInit {
    userGroups: UserGroup[];
    rowCount = 0;
    loading = false;
    unsubscribe: Subject<void> = new Subject();
    @ViewChild('userGroupsTable') userGroupsTable: Table = null;
    event: any = null;
    constructor(
        private wsaApiService: WSAApiService,
        private changeDetection: ChangeDetectorRef
    ) { }
    loadUserGroups(event: any): void {
        this.event = event;
        this.loading = true;
        this.changeDetection.detectChanges();
        this.wsaApiService.getUserGroups(event).pipe(takeUntil(this.unsubscribe)).subscribe((rsp) => {
            this.userGroups = rsp.userGroups;
            this.rowCount = rsp.rowCount;
            this.loading = false;
        }).add(() => {
            this.changeDetection.detectChanges();
        });
    }
    reloadUserGroups(): void {
        this.loadUserGroups(this.event);
    }
    ngAfterViewInit(): void {
        if (this.userGroupsTable === undefined) {
            return;
        }
        this.userGroupsTable.onLazyLoad.pipe(
            startWith(this.userGroupsTable.createLazyLoadMetadata())
        ).subscribe((event) => {
            this.loadUserGroups(event);
        });
    }
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
