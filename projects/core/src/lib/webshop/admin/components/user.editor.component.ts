import { OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WSAApiService } from '../admin.api.service';
import { UserEditor, UserGroup } from '../admin.interfaces';

export class WSAUserEditorComponent implements OnDestroy {
    userId: number = null;
    userEditor: UserEditor = null;
    userGroups: UserGroup[] = [];
    dataLoading = false;
    loading = false;
    userEditorFormGroup: FormGroup = null;
    unsubscribe: Subject<void> = new Subject();
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
            ]).pipe(takeUntil(this.unsubscribe)).subscribe(([getUserGroupsResponse]) => {
                this.userGroups = getUserGroupsResponse.userGroups;
            }).add(() => {
                this.dataLoading = false;
            });
        } else {
            combineLatest([
                this.wsaApiService.getUserGroups(null),
                this.wsaApiService.getUser(this.userId)
            ]).pipe(takeUntil(this.unsubscribe)).subscribe(([getUserGroupsResponse, getUserResponse]) => {
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
        this.userEditorFormGroup.get('username').setValue(userEditor.username);
        this.userEditorFormGroup.get('fullname').setValue(userEditor.fullname);
        this.userEditorFormGroup.get('password').setValue(userEditor.password);
        this.userEditorFormGroup.get('active').setValue(userEditor.active);
        this.userEditorFormGroup.get('userGroups').setValue(this.userGroups.filter((userGroup) => {
            return userEditor.userGroups.indexOf(userGroup.id) !== -1;
        }));
    }
    save(): void {
        this.loading = true;
        const userEditorFormValue: any = this.userEditorFormGroup.value;
        if (this.userId === null) {
            this.wsaApiService.createUser({
                active: userEditorFormValue.active,
                fullname: userEditorFormValue.fullname,
                password: userEditorFormValue.password,
                username: userEditorFormValue.username,
                userGroups: userEditorFormValue.userGroups.map(userGroup => userGroup.id)
            }).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
                this.ref.close();
            }).add(() => {
                this.loading = false;
            });
        } else {
            this.wsaApiService.updateUser(this.userId, {
                active: userEditorFormValue.active,
                fullname: userEditorFormValue.fullname,
                password: userEditorFormValue.password,
                username: userEditorFormValue.username,
                userGroups: userEditorFormValue.userGroups.map(userGroup => userGroup.id)
            }).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
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
