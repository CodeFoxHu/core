import { OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WSAApiService } from '../admin.api.service';
import { CustomerGroupEditor, UserGroup } from '../admin.interfaces';

export class WSACustomerGroupEditorComponent implements OnDestroy {
    customerGroupId: number = null;
    customerGroupEditor: CustomerGroupEditor = null;
    userGroups: UserGroup[] = [];
    dataLoading = false;
    loading = false;
    customerGroupEditorFormGroup: FormGroup = null;
    unsubscribe: Subject<void> = new Subject();
    constructor(
        private wsaApiService: WSAApiService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        this.customerGroupId = this.config.data.customerGroupId;
    }
    init(): void {
        this.initCustomerGroupEditorFormGroup();
        this.loadData();
    }
    loadData(): void {
        if (this.customerGroupId !== null) {
            this.dataLoading = true;
            this.wsaApiService.getCustomerGroup(this.customerGroupId).pipe(takeUntil(this.unsubscribe)).subscribe((rsp) => {
                this.customerGroupEditor = rsp.customerGroupEditor;
                this.fillCustomerGroupEditorForm(this.customerGroupEditor);
            }).add(() => {
                this.dataLoading = false;
            });
        }
    }
    initCustomerGroupEditorFormGroup(): void {
        this.customerGroupEditorFormGroup = new FormGroup({
            name: new FormControl('', [Validators.required])
        });
    }
    fillCustomerGroupEditorForm(customerGroupEditor: CustomerGroupEditor): void {
        this.customerGroupEditorFormGroup.get('name').setValue(customerGroupEditor.name);
    }
    save(): void {
        this.loading = true;
        const userEditorFormValue: any = this.customerGroupEditorFormGroup.value;
        if (this.customerGroupId === null) {
            this.wsaApiService.createCustomerGroup(userEditorFormValue).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
                this.ref.close();
            }).add(() => {
                this.loading = false;
            });
        } else {
            this.wsaApiService.updateCustomerGroup(this.customerGroupId, userEditorFormValue).pipe(
                takeUntil(this.unsubscribe)
            ).subscribe(() => {
                this.ref.close();
            }).add(() => {
                this.loading = false;
            });
        }
    }
    close(): void {
        this.ref.close();
    }
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
