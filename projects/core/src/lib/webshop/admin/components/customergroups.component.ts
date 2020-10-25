import { WSAApiService } from '../admin.api.service';
import { CustomerGroup } from '../admin.interfaces';

export class WSACustomerGroupsComponent {
    customerGroups: CustomerGroup[];
    rowCount = 0;
    loading = false;
    constructor(
        private wsaApiService: WSAApiService
    ) { }
    loadCustomerGroups(event: any): void {
        this.loading = true;
        this.wsaApiService.getCustomerGroups(event).subscribe((rsp) => {
            this.customerGroups = rsp.customerGroups;
            this.rowCount = rsp.rowCount;
        }).add(() => {
            this.loading = false;
        });
    }
}
