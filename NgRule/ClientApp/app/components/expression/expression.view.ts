import { Component, Input } from '@angular/core';

@Component({
    selector: 'expression-view',
    templateUrl: './expression.view.html',
    styleUrls: ['./expression.view.css']
})
export class Expression {
    @Input() expression: any;

    addChild() {
        if (!this.expression.children) {
            this.expression.children = [];
        }

        this.expression.children.push({
            operator: "eq",
            operand: "",
            argumant: "",
            value: "",
            isActive: true,
            children: []
        });
    }


    operators: Array<string> = [
        "match_all",
        "match_any",
        "eq",
        "not-eq"
    ];

    operands: Array<string> = [
        "category",
        "summary",
        "source",
        "property"
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
}
