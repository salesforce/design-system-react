/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Expression Condition design pattern](https://lightningdesignsystem.com/components/visual-picker/) in React.
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
import { EXPRESSION_CONDITION } from '../../utilities/constants';

import Combobox from '../combobox';
import Input from '../input';
import Button from '../button';

const propTypes = {
	assistiveText: PropTypes.shape({
		title: PropTypes.string,
		delete: PropTypes.string
	}),
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * Visual Picker accepts `Checkbox`, `Radio` and `VisualPickerLink` components as children. Please see `Checkbox`, `Radio` and `VisualPickerLink` for props.
	 */
	children: PropTypes.node,
	/**
	 * CSS classes to be added to tag with `.slds-form-element`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),

	labels: PropTypes.shape({
		condition: PropTypes.string,
		resource: PropTypes.string,
		operator: PropTypes.string,
		value: PropTypes.string
	}),

	resourcesList: PropTypes.arrayOf(PropTypes.object),
	resourceSelected: PropTypes.object,
	onChangeResource: PropTypes.func,

	operator: PropTypes.oneOf(['equal', 'notEqual', 'greaterThan', 'lessThan']),

	onChangeOperator: PropTypes.func,

	onDelete: PropTypes.func

};

const operatorSelections = [
	{
		id: '1',
		label: 'Equals',
	},
	{
		id: '2',
		label: 'Does Not Equals',
	},
	{
		id: '3',
		label: 'Greater Than',
	},
	{
		id: '4',
		label: 'Less Than',
	}
];

/**
 * Expression Condition Component
 */
class ExpressionCondition extends React.Component {
	componentWillMount() {
		this.generatedId = shortid.generate();
	}

	/**
	 * Get the Expression Condition's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	getResourceSelected(){
		const selection = this.props.resourceSelected;
		const selected = [];
		selected.push(selection);
		return selected;
	}

	getOperatorSelected(){
		const selected = [];
		const operator = this.props.operator;
		if(operator === "equal"){
			selected.push(operatorSelections[0])
		} else if(operator === "notEqual"){
			selected.push(operatorSelections[1])
		} else if(operator === "greaterThan"){
			selected.push(operatorSelections[2])
		} else if(operator === "lessThan"){
			selected.push(operatorSelections[3])
		}
		return selected;
	}

	operatorChange(event, data)
	{
		const selection = data.selection[0].id;
		let operator = "";
		if(selection === '1') {
			operator = "equal"
		} else if(selection === '2'){
			operator = "notEqual"
		} else if(selection === '3'){
			operator = "greaterThan"
		} else if(selection === '4'){
			operator = "lessThan"
		}
		// eslint-disable-next-line no-unused-expressions
		typeof this.props.onChangeOperator === "function" ? this.props.onChangeOperator(operator) : null;
	}

	render() {
		return (
				<li className={classNames(`slds-expression__row`, this.props.className)} id={this.getId()}>
					<fieldset>
						<legend className="slds-expression__legend">
							<span>{this.props.labels && this.props.labels.condition ? this.props.labels.condition : null }</span>
							<span className="slds-assistive-text">{this.props.assistiveText ? this.props.assistiveText.title : 'Condition' }</span>
						</legend>
						<div className="slds-grid slds-gutters_xx-small">
							<div className="slds-col">
								<Combobox
									events={{
										onSelect: (event, data) => {
											// eslint-disable-next-line no-unused-expressions
											typeof this.props.onChangeResource === "function" ? this.props.onChangeResource(event,data) : null;
										},
									}}
									multiple={false}
									variant="readonly"
									labels={{ label: this.props.labels && this.props.labels.resource ? this.props.labels.resource : "Resource"}}
									options={this.props.resourcesList}
									selection={this.getResourceSelected()}
								/>
							</div>
							<div className="slds-col slds-grow-none">
								<Combobox
									events={{
										onSelect: (event, data) => { this.operatorChange(event, data) },
									}}
									multiple={false}
									variant="readonly"
									labels={{ label: this.props.labels && this.props.labels.operator ? this.props.labels.operator : "Operator"}}
									options={operatorSelections}
									selection={this.getOperatorSelected()}
									singleInputDisabled={!this.props.resourceSelected}

								/>
							</div>
							<div className="slds-col">
								<Input
									label={this.props.labels && this.props.labels.value ? this.props.labels.value : "Value" }
									disabled={!this.props.resourceSelected}
								/>
							</div>
							<div className="slds-col slds-grow-none">
								<div className="slds-form-element">
									<span className="slds-form-element__label">&nbsp;</span>
									<div className="slds-form-element__control">
										<Button
											variant="outline-brand"
											iconCategory="utility"
											iconName="delete"
											iconVariant="border-filled"
											onClick={() => {
												// eslint-disable-next-line no-unused-expressions
												typeof this.props.onDelete === "function" ? this.props.onDelete() : null;
											}}
											assistiveText={{ icon: this.props.assistiveText ? this.props.assistiveText.delete : 'Delete Condition'}}
											title={this.props.assistiveText ? this.props.assistiveText.delete : 'Delete Condition'}
										/>
									</div>
								</div>
							</div>
						</div>
					</fieldset>
				</li>
		)
	}
}

ExpressionCondition.displayName = EXPRESSION_CONDITION;
ExpressionCondition.propTypes = propTypes;

export default ExpressionCondition;
