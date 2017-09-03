import { Component } from '@angular/core';
import { ProjectRoleService } from '../../services/project-role.service';

@Component({
	selector: 'rule',
	templateUrl: './rule.component.html',
	styleUrls: ['./rule.component.css']
})
export class RuleComponent {

	_rule?: Rule;

	constructor(private _projectService: ProjectRoleService) {
	}

	// @TODO: We're probably going to be passing an ID into this component? (ie: /rules/abcd-efg)
	ngOnInit() {
		let id = "abcdefg-hijklmnop-qrs-tuv-wxyz";

		this._projectService.getRule(id).then((res: any) => {
			this._rule = res;
		}, (error) => {
			console.log("Failed to get rule", error._body, "error");
		});
	}

	clear() {
		this._rule = undefined;
	}

	clearExpression() {
		if (this._rule) {
			this._rule.expression = undefined;
		}
	}

	addNewExpression() {
		if (this._rule) {
			this._rule.expression = {
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
	}

	//save() {
	//	this._projectService.saveExpression(this._expression)
	//		.then(() => console.log("saved"),
	//		(e) => { console.log("failed", e._body, "error") }
	//		);
	//}
}

interface Expression {
	operator: string;
	operand: string;
	argument: string;
	value: string;
	isActive: boolean;
	children: Expression[];
}

interface Property {
	category: string;
	name: string;
	value: string;
}

interface ActionDefinition {
	type: string;
	properties?: Property[];
}

interface Rule {
	id: string;
	name: number;
	temperatureF: number;
	summary: string;
	expression?: Expression;
	actions?: ActionDefinition[];
}
