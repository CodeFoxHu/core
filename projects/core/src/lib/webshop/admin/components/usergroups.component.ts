import { WSAApiService } from '../admin.api.service';
import { UserGroup } from '../admin.interfaces';

export class WSAUserGroupsComponent {
    userGroups: UserGroup[];
    rowCount = 0;
    loading = false;
    constructor(
        private wsaApiService: WSAApiService
    ) { }
    loadUserGroups(event: any): void {
        this.loading = true;
        this.wsaApiService.getUserGroups(event).subscribe((rsp) => {
            this.userGroups = rsp.userGroups;
            this.rowCount = rsp.rowCount;
        }).add(() => {
            this.loading = false;
        });
    }
}
