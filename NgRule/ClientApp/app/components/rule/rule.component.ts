import { Component } from '@angular/core';
import { ProjectRoleService } from '../../services/project-role.service';
import { Rule, Meta, Property } from '../../entities/entities';

@Component({
	selector: 'rule',
	templateUrl: './rule.component.html',
	styleUrls: ['./rule.component.css']
})
export class RuleComponent {

    _rule?: Rule;
    _meta?: Array<Meta>;

	constructor(private _projectService: ProjectRoleService) {
	}

	// @TODO: We're probably going to be passing an ID into this component? (ie: /rules/abcd-efg)
	ngOnInit() {
		let id = "abcdefg-hijklmnop-qrs-tuv-wxyz";

        // Load meta data
        this._projectService.getMeta().then((res: Array<Meta>) => {
            this._meta = res;
            // Load rule data
            this._projectService.getRule(id).then((res: Rule) => {
                this._rule = res;
            }, (error) => {
                console.log("Failed to get rule", error._body, "error");
            });
        }, (error) => {
            console.log("Failed to get meta", error._body, "error");
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

	createRootExpression() {
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

	addAction(type: string) {
		if (this._rule) {
			if (!this._rule.actions) {
				this._rule.actions = [];
            }

            if (this._meta) {
                let action = {
                    type: type,
                    isActive: true,
                    properties: Array<Property>()
                };

                this._meta.filter(z => z.type == "action" && z.source == type).forEach(i => {
                    action.properties.push({
                        category: "",
                        name: i.propertyName,
                        value: ""
                    });
                });

                this._rule.actions.push(action);
            }

		}
	}

	//save() {
	//	this._projectService.saveExpression(this._expression)
	//		.then(() => console.log("saved"),
	//		(e) => { console.log("failed", e._body, "error") }
	//		);
	//}
}

