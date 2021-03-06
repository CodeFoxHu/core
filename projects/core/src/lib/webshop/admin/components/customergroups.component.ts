import { AfterViewInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { WSAApiService } from '../admin.api.service';
import { CustomerGroup } from '../admin.interfaces';

export class WSACustomerGroupsComponent implements OnDestroy, AfterViewInit {
    customerGroups: CustomerGroup[];
    rowCount = 0;
    loading = true;
    unsubscribe: Subject<void> = new Subject();
    @ViewChild('customerGroupsTable') customerGroupsTable: Table = null;
    constructor(
        private wsaApiService: WSAApiService,
        private changeDetection: ChangeDetectorRef
    ) { }
    loadCustomerGroups(event: any): void {
        this.loading = true;
        this.changeDetection.detectChanges();
        this.wsaApiService.getCustomerGroups(event).subscribe((rsp) => {
            this.customerGroups = rsp.customerGroups;
            this.rowCount = rsp.rowCount;
            this.loading = false;
        }).add(() => {
            this.changeDetection.detectChanges();
        });
    }
    ngAfterViewInit(): void {
        if (this.customerGroupsTable === undefined) {
            return;
        }
        this.customerGroupsTable.onLazyLoad.pipe(
            startWith(this.customerGroupsTable.createLazyLoadMetadata())
        ).subscribe((event) => {
            this.loadCustomerGroups(event);
        });
    }
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
