import { Component } from '@angular/core';
import { ProjectRoleService } from '../../services/project-role.service';
import { Rule, Property, MetaData, ActionMetaData, ExpressionMetaData } from '../../entities/entities';

@Component({
	selector: 'rule',
	templateUrl: './rule.component.html',
	styleUrls: ['./rule.component.css']
})
export class RuleComponent {

    _rule?: Rule;
    _metaData: MetaData;

	constructor(private _projectService: ProjectRoleService) {
	}

	// @TODO: We're probably going to be passing an ID into this component? (ie: /rules/abcd-efg)
	ngOnInit() {
		let id = "abcdefg-hijklmnop-qrs-tuv-wxyz";

        this._projectService.getMetaData().then((res: MetaData) => {
            this._metaData = res;

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

    addAction(meta: ActionMetaData) {
        if (this._rule) {
            let action = {
                type: meta.type,
                isActive: true,
                properties: Array<Property>()
            };

            // I'm thinking that 'action' here should be it's own component
            meta.properties.forEach(p => {
                action.properties.push({
                    name: p.name,
                    category: "",
                    value: ""
                });
            });

            if (!this._rule.actions) {
                this._rule.actions = [];
            }

            this._rule.actions.push(action);
        }
    }

	//save() {
	//	this._projectService.saveExpression(this._expression)
	//		.then(() => console.log("saved"),
	//		(e) => { console.log("failed", e._body, "error") }
	//		);
	//}
}

