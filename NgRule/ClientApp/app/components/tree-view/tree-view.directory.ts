import { Component, Input } from '@angular/core';

@Component({
    selector: 'tree-view',
    templateUrl: './tree-view.html'
})
export class TreeView {
    @Input() menuList: any;
}  