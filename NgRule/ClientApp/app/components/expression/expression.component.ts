import { Component } from '@angular/core';
import { ExpressionView } from './expression.view';
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

	clear() {
		this._expression = null;
	}

	addNew() {
		this._expression = {
			operator: "match_all",
			operand: "",
			argument: "",
			value: "",
			isActive: true,
			children: [
				{
					operator: "eq",
					operand: "Category",
					argument: "",
					value: "information",
					isActive: true,
					children: []
				}
			]
		};
	}

    save() {
        this._projectService.saveExpression(this._expression)
            .then(() => console.log("saved"),
            (e) => { console.log("failed", e._body, "error") }
        );
        
    }
}