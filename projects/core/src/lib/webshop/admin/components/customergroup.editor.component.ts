import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WSAApiService } from '../admin.api.service';
import { CustomerGroupEditor, UserGroup } from '../admin.interfaces';

export class WSACustomerGroupEditorComponent {
    customerGroupId: number = null;
    customerGroupEditor: CustomerGroupEditor = null;
    userGroups: UserGroup[] = [];
    dataLoading = false;
    loading = false;
    customerGroupEditorFormGroup: FormGroup = null;
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
            this.wsaApiService.getCustomerGroup(this.customerGroupId).subscribe((rsp) => {
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
            this.wsaApiService.createCustomerGroup(userEditorFormValue).subscribe(() => {
                this.ref.close();
            }).add(() => {
                this.loading = false;
            });
        } else {
            this.wsaApiService.updateCustomerGroup(this.customerGroupId, userEditorFormValue).subscribe(() => {
                this.ref.close();
            }).add(() => {
                this.loading = false;
            });
        }
    }
    close(): void {
        this.ref.close();
    }
}
