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
		delete: PropTypes.string,
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
		value: PropTypes.string,
	}),

	isChild: PropTypes.bool,

	resourcesList: PropTypes.arrayOf(PropTypes.object),
	resourceSelected: PropTypes.object,
	onChangeResource: PropTypes.func,

	operatorsList: PropTypes.arrayOf(PropTypes.object),
	operatorSelected: PropTypes.object,
	onChangeOperator: PropTypes.func,

	value: PropTypes.string,
	onChangeValue: PropTypes.func,

	onDelete: PropTypes.func,
};

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

	render() {
		return (
			<li
				className={classNames(
					`slds-expression__row`,
					this.props.isChild ? 'slds-expression__row_group' : null,
					this.props.className
				)}
				id={this.getId()}
			>
				<fieldset>
					<legend className="slds-expression__legend">
						<span>
							{this.props.labels && this.props.labels.condition
								? this.props.labels.condition
								: null}
						</span>
						<span className="slds-assistive-text">
							{this.props.assistiveText
								? this.props.assistiveText.title
								: 'Condition'}
						</span>
					</legend>
					<div className="slds-grid slds-gutters_xx-small">
						<div className="slds-col">
							<Combobox
								events={{
									onSelect: (event, data) => {
										this.props.onChangeResource(event, data);
									},
								}}
								multiple={false}
								variant="readonly"
								labels={{
									label:
										this.props.labels && this.props.labels.resource
											? this.props.labels.resource
											: 'Resource',
								}}
								options={this.props.resourcesList}
								selection={[this.props.resourceSelected]}
							/>
						</div>
						<div className="slds-col slds-grow-none">
							<Combobox
								events={{
									onSelect: (event, data) => {
										this.props.onChangeOperator(event, data);
									},
								}}
								multiple={false}
								variant="readonly"
								labels={{
									label:
										this.props.labels && this.props.labels.operator
											? this.props.labels.operator
											: 'Operator',
								}}
								options={this.props.operatorsList}
								selection={[this.props.operatorSelected]}
								singleInputDisabled={!this.props.resourceSelected}
							/>
						</div>
						<div className="slds-col">
							<Input
								label={
									this.props.labels && this.props.labels.value
										? this.props.labels.value
										: 'Value'
								}
								value={this.props.value}
								onChange={(e, obj) => this.props.onChangeValue(obj.value)}
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
											this.props.onDelete();
										}}
										assistiveText={{
											icon: this.props.assistiveText
												? this.props.assistiveText.delete
												: 'Delete Condition',
										}}
										title={
											this.props.assistiveText
												? this.props.assistiveText.delete
												: 'Delete Condition'
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</fieldset>
			</li>
		);
	}
}

ExpressionCondition.displayName = EXPRESSION_CONDITION;
ExpressionCondition.propTypes = propTypes;

export default ExpressionCondition;
