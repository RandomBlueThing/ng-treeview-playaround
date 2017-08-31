import { Component } from '@angular/core';
import { TreeView } from './tree-view.directory';
import { ProjectRoleService } from '../../services/project-role.service';

@Component({
    selector: 'tree-view-menu',
    template: '<tree-view [menuList]="menuList"></tree-view>'
})
export class TreeViewComponent {
    public roleName: string;
    menuList: any;

    constructor(private _projectService: ProjectRoleService) {
    }

    ngOnInit() {
        this.roleName = "Admin";
        this._projectService.getMenuDetails(this.roleName).then((res: any) => {
            this.menuList = res;
        }, (error) => {
            console.log("Failed to get Treeview menu details", error._body, "error");
        });
    }
}  