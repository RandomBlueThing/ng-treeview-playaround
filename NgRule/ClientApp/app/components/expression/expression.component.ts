import { Component } from '@angular/core';
import { Expression } from './expression.view';
import { ProjectRoleService } from '../../services/project-role.service';

@Component({
    selector: 'expressions',
    templateUrl: './expression.component.html'
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

    save() {
        this._projectService.saveExpression(this._expression)
            .then(() => console.log("saved"),
            (e) => { console.log("failed", e._body, "error") }
        );
        
    }
}