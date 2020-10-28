import { AfterViewInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { WSAApiService } from '../admin.api.service';
import { Customer } from '../admin.interfaces';
import { Table } from 'primeng/table';

export class WSACustomersComponent implements OnDestroy, AfterViewInit {
    customers: Customer[] = [];
    rowCount = 0;
    loading = false;
    unsubscribe: Subject<void> = new Subject();
    @ViewChild('customersTable') customersTable: Table = null;
    constructor(
        private wsaApiService: WSAApiService,
        private changeDetection: ChangeDetectorRef
    ) { }
    loadCustomers(event: any): void {
        this.loading = true;
        this.changeDetection.detectChanges();
        this.wsaApiService.getCustomers(event).pipe(takeUntil(this.unsubscribe)).subscribe((rsp) => {
            this.customers = rsp.customers;
            this.rowCount = rsp.rowCount;
            this.loading = false;
        }).add(() => {
            this.changeDetection.detectChanges();
        });
    }
    ngAfterViewInit(): void {
        if (this.customersTable === undefined) {
            return;
        }
        this.customersTable.onLazyLoad.pipe(
            startWith(this.customersTable.createLazyLoadMetadata())
        ).subscribe((event) => {
            this.loadCustomers(event);
        });
    }
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
