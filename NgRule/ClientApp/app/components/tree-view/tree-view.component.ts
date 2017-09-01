import { Component } from '@angular/core';
import { TreeView } from './tree-view.directory';
import { ProjectRoleService } from '../../services/project-role.service';

@Component({
    selector: 'tree-view-menu',
    template: '<tree-view [menuList]="_menuList"></tree-view>'
})
export class TreeViewComponent {

	_menuList: any;

    constructor(private _projectService: ProjectRoleService) {
    }

    ngOnInit() {
		this._projectService.getMenuDetails().then((res: any) => {
            this._menuList = res;
        }, (error) => {
            console.log("Failed to get Treeview menu details", error._body, "error");
        });
    }
}