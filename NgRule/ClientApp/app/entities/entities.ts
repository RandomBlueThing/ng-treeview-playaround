
export interface Expression {
	operator: string;
	operand: string;
	argument: string;
	value: string;
	isActive: boolean;
	children: Expression[];
}

export interface Property {
	category: string;
	name: string;
	value: string;
}

export interface ActionDefinition {
	type: string;
	properties?: Property[];
	isActive: boolean;
}

export interface Rule {
	id: string;
	name: number;
	temperatureF: number;
	summary: string;
	expression?: Expression;
	actions?: ActionDefinition[];
}

export interface Option {
    display: string;
    value: string;
}

export interface MetaDataCapture {
    name: string;
    isRequired: boolean;
    dataType: string;
    options: Option[];
}

export interface ActionMetaData {
    type: string;
    properties: MetaDataCapture[];
}

export interface ExpressionMetaData {
    operand: string;
    dataType: string;
    options: Option[];
}

export interface MetaData{
    actionMetaData: ActionMetaData[];
    expressionMetaData: ExpressionMetaData[];
}