import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { combineLatest } from 'rxjs';
import { WSAApiService } from '../admin.api.service';
import { UserEditor, UserGroup } from '../admin.interfaces';

export class WSAUserEditorComponent {
    userId: number = null;
    userEditor: UserEditor = null;
    userGroups: UserGroup[] = [];
    dataLoading = false;
    loading = false;
    userEditorFormGroup: FormGroup = null;
    constructor(
        private wsaApiService: WSAApiService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        this.userId = this.config.data.userId;
    }
    init(): void {
        this.initUserEditorFormGroup();
        this.loadData();
    }
    loadData(): void {
        this.dataLoading = true;
        if (this.userId === null) {
            combineLatest([
                this.wsaApiService.getUserGroups(null)
            ]).subscribe(([getUserGroupsResponse]) => {
                this.userGroups = getUserGroupsResponse.userGroups;
            }).add(() => {
                this.dataLoading = false;
            });
        } else {
            combineLatest([
                this.wsaApiService.getUserGroups(null),
                this.wsaApiService.getUser(this.userId)
            ]).subscribe(([getUserGroupsResponse, getUserResponse]) => {
                this.userGroups = getUserGroupsResponse.userGroups;
                this.userEditor = getUserResponse.userEditor;
                this.fillUserEditorForm(this.userEditor);
            }).add(() => {
                this.dataLoading = false;
            });
        }
    }
    initUserEditorFormGroup(): void {
        this.userEditorFormGroup = new FormGroup({
            username: new FormControl('', [Validators.required]),
            fullname: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            active: new FormControl(true),
            userGroups: new FormControl('', [Validators.required])
        });
    }
    fillUserEditorForm(userEditor: UserEditor): void {
        this.userEditorFormGroup.setValue(userEditor);
    }
    save(): void {
        this.loading = true;
        const userEditor: UserEditor = this.userEditorFormGroup.value;
        if (this.userId === null) {
            this.wsaApiService.createUser(userEditor).subscribe(() => {
                this.ref.close();
            }).add(() => {
                this.loading = false;
            });
        } else {
            this.wsaApiService.updateUser(this.userId, userEditor).subscribe(() => {
                this.ref.close();
            }).add(() => {
                this.loading = false;
            });
        }
    }
}
