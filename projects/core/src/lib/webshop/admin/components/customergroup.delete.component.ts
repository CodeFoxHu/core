import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WSAApiService } from '../admin.api.service';

export class WSACustomerGroupDeleteComponent {
    customerGroupId: number;
    loading = false;
    constructor(
        private wsaApiService: WSAApiService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        this.customerGroupId = this.config.data.customerGroupId;
    }
    delete(): void {
        this.loading = true;
        this.wsaApiService.deleteCustomerGroup(this.customerGroupId).subscribe((rsp) => {
            this.close();
        }).add(() => {
            this.loading = false;
        });
    }
    close(): void {
        this.ref.close();
    }
}
