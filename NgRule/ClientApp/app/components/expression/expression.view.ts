import { Component, Input } from '@angular/core';

@Component({
    selector: 'expression-view',
    templateUrl: './expression.view.html',
    styleUrls: ['./expression.view.css']
})
export class Expression {
    @Input() expression: any;

    addChild() {
        this.expression.children.push({
            operator: "newbie",
            operand: "",
            argumant: "",
            value: "",
            isActive: true,
            children: []
        });
    }

    // We're kind of in the wrong place to be doing this. We need the parent to reemove this instance from it's children.
    deleteExpression() {
        this.expression.isActive = false;
        
    };
}
