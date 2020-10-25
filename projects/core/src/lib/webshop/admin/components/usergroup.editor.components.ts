import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { combineLatest } from 'rxjs';
import { WSAApiService } from '../admin.api.service';
import { Permission, UserGroupEditor } from '../admin.interfaces';
import { TreeNode } from 'primeng/api/treenode';

export class WSAUserGroupEditorComponent {
    userGroupId: number;
    dataLoading = false;
    loading = false;
    userGroupEditorFormGroup: FormGroup = null;
    permissions: Permission[] = [];
    permissionTreeNodes: TreeNode[] = [];
    selectedPermissionTreeNodes: TreeNode[] = [];
    userGroupEditor: UserGroupEditor = null;
    constructor(
        private wsaApiService: WSAApiService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        this.userGroupId = config.data.userGroupId;
    }
    init(): void {
        this.initUserGroupEditorFormGroup();
        this.loadData();
    }
    loadData(): void {
        this.dataLoading = true;
        if (this.userGroupId === null) {
            combineLatest([
                this.wsaApiService.getPermissions()
            ]).subscribe(([getPermissionsResponse]) => {
                this.permissions = getPermissionsResponse.permissions;
                this.convertPermissionsToTreeNodes(this.permissions, this.permissionTreeNodes);
            }).add(() => {
                this.dataLoading = false;
            });
        } else {
            combineLatest([
                this.wsaApiService.getPermissions(),
                this.wsaApiService.getUserGroup(this.userGroupId)
            ]).subscribe(([getPermissionsResponse, getUserGroupResponse]) => {
                this.permissions = getPermissionsResponse.permissions;
                this.userGroupEditor = getUserGroupResponse.userGroupEditor;
                this.fillUserGroupEditorForm(this.userGroupEditor);
                this.convertPermissionsToTreeNodes(this.permissions, this.permissionTreeNodes);
            }).add(() => {
                this.dataLoading = false;
            });
        }
    }
    initUserGroupEditorFormGroup(): void {
        this.userGroupEditorFormGroup = new FormGroup({
            name: new FormControl('', [Validators.required])
        });
    }
    fillUserGroupEditorForm(userGroupEditor: UserGroupEditor): void {
        this.userGroupEditorFormGroup.get('name').setValue(userGroupEditor.name);
    }
    save(): void {
        this.loading = true;
        const userGroupEditorFormValue: any = this.userGroupEditorFormGroup.value;
        if (this.userGroupId === null) {
            this.wsaApiService.createUserGroup({
                name: userGroupEditorFormValue.name,
                permissions: this.selectedPermissionTreeNodes.map(permission => permission.data)
            }).subscribe(() => {
                this.ref.close();
            }).add(() => {
                this.loading = false;
            });
        } else {
            this.wsaApiService.updateUserGroup(this.userGroupId, {
                name: userGroupEditorFormValue.name,
                permissions: this.selectedPermissionTreeNodes.map(permission => permission.data)
            }).subscribe(() => {
                this.ref.close();
            }).add(() => {
                this.loading = false;
            });
        }
    }
    close(): void {
        this.ref.close();
    }
    convertPermissionsToTreeNodes(permissions: Permission[], treeNodes: TreeNode[]): TreeNode {
        if (permissions.length === 0) {
            return;
        }
        permissions = permissions.sort((a, b) => a.name.localeCompare(b.name));
        for (const permission of permissions) {
            const treeNode: TreeNode = {
                label: permission.name,
                data: permission.id,
                partialSelected: this.hasSelectedChildren(permission.children)
            };
            if (permission.children.length > 0) {
                treeNode.children = [];
                this.convertPermissionsToTreeNodes(permission.children, treeNode.children);
            }
            if (this.userGroupEditor !== null) {
                if (this.userGroupEditor.permissions.indexOf(permission.id) !== -1) {
                    this.selectedPermissionTreeNodes.push(treeNode);
                }
            }
            treeNodes.push(treeNode);
        }
    }
    hasSelectedChildren(permissions: Permission[]): boolean {
        if (this.userGroupEditor === null || permissions.length === 0) {
            return false;
        }
        for (const permission of permissions) {
            if (this.userGroupEditor.permissions.indexOf(permission.id) !== -1 || this.hasSelectedChildren(permission.children)) {
                return true;
            }
        }
        return false;
    }
}
