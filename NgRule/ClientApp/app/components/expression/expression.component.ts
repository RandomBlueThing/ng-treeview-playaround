import { Component, Input } from '@angular/core';
import { Expression } from '../../entities/entities';

@Component({
    selector: 'expression-view',
    templateUrl: './expression.component.html',
    styleUrls: ['./expression.component.css']
})
export class ExpressionComponent {
	@Input() expression: Expression;
	@Input() isRoot: boolean;

	isMouseOverDelete: boolean;

    addChild() {
        if (!this.expression.children) {
            this.expression.children = [];
        }

        this.expression.children.push({
            operator: "eq",
            operand: "",
            argument: "",
            value: "",
            isActive: true,
            children: []
        });
    }

	addGroup() {
		if (!this.expression.children) {
			this.expression.children = [];
		}

		this.expression.children.push({
			operator: "match_all",
			operand: "",
			argument: "",
			value: "",
			isActive: true,
			children: []
		});
	}

	delMouseEnter() {
		this.isMouseOverDelete = true;
	}

	delMouseLeave() {
		this.isMouseOverDelete = false;
	}

	//@TODO: From MetaData
    expressionOperators: Array<string> = [
        "eq",
		"not-eq",
		"regex"
    ];

	//@TODO: From MetaData
	groupOperators: Array<string> = [
		"match_all",
		"match_any"
	];


	//@TODO: From MetaData
    operands: Array<string> = [
        "Category",
        "Summary",
        "Source",
		"Timestamp",
        "Property"
    ];

    // We don't actually delete stuff, just mark as inactive. We can let the server actually delete stuff if it
    // wants to (if we deleted it here, the server wouldn't even have any way of knowing it had been deleted!)
    deleteExpression() {
        this.expression.isActive = false;        
    };


    // It's a container if the operand requires child exprssions
    get isContainer(): boolean {
        return this.expression.operator.toUpperCase() === "MATCH_ALL"
            || this.expression.operator.toUpperCase() === "MATCH_ANY";
	}


	get isActive(): boolean {
		return this.expression.isActive;
	}
}
