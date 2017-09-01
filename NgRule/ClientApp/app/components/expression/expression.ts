import { Component, Input } from '@angular/core';

@Component({
    selector: 'expression-view',
    templateUrl: './expression.html',
    styleUrls: ['./expression.css']
})
export class Expression {
    @Input() expression: any;
}  