import { Component } from '@angular/core';
import { Expression } from './expression';
import { ProjectRoleService } from '../../services/project-role.service';

@Component({
    selector: 'expressions',
    template: '<expression-view [expression]="_expression"></expression-view>'
})
export class ExpressionComponent {

    _expression: any;

    constructor(private _projectService: ProjectRoleService) {
    }

    ngOnInit() {
        this._projectService.getExpression().then((res: any) => {
            this._expression = res;
        }, (error) => {
            console.log("Failed to get expression details", error._body, "error");
        });
    }
}