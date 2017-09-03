import { Component, Input } from '@angular/core';
import { ActionDefinition } from '../../entities/entities';

@Component({
	selector: 'action-definition',
	templateUrl: './action-definition.component.html',
	styleUrls: ['./action-definition.component.css']
})
export class ActionDefinitionComponent {
	@Input() action: ActionDefinition;

	deleteAction() {
		this.action.isActive = false;
	}
}

