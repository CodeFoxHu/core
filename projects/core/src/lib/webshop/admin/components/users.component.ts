import { WSAApiService } from '../admin.api.service';
import { User } from '../admin.interfaces';

export class WSAUsersComponent {
    users: User[];
    rowCount = 0;
    loading = false;
    constructor(
        private wsaApiService: WSAApiService
    ) { }
    loadUsers(event: any): void {
        this.loading = true;
        this.wsaApiService.getUsers(event).subscribe((rsp) => {
            this.users = rsp.users;
            this.rowCount = rsp.rowCount;
        }).add(() => {
            this.loading = false;
        });
    }
}
