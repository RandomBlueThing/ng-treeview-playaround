import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';

import { ProjectRoleService } from './services/project-role.service'

import { TreeView } from './components/tree-view/tree-view.directory';
import { TreeViewComponent } from './components/tree-view/tree-view.component';

import { ExpressionView } from './components/expression/expression.view';
import { ExpressionComponent } from './components/expression/expression.component';

import { RuleComponent } from './components/rule/rule.component';
import { ActionDefinitionComponent } from './components/actiondefinition/action-definition.component';

//import { Expression, Property, ActionDefinition, Rule } from './entities/entities'

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        TreeViewComponent, TreeView,
		ExpressionComponent, ExpressionView,
		RuleComponent,
		ActionDefinitionComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            //{ path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'tree-view-menu', component: TreeViewComponent },
            { path: 'expressions', component: ExpressionComponent },
			{ path: 'rules', component: RuleComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        ProjectRoleService
    ]
})
export class AppModuleShared {
}
