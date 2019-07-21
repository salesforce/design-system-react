/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Expression Condition design pattern](https://lightningdesignsystem.com/components/visual-picker/) in React.
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import assign from 'lodash.assign';

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
		deleteIcon: PropTypes.string,
	}),
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * CSS classes to be added to tag with `.slds-form-element`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),

	events: PropTypes.shape({
		onChangeResource: PropTypes.func,
		onChangeOperator: PropTypes.func,
		onChangeValue: PropTypes.func,
		onDelete: PropTypes.func,
	}),

	labels: PropTypes.shape({
		condition: PropTypes.string,
		resource: PropTypes.string,
		operator: PropTypes.string,
		value: PropTypes.string,
	}),

	isSubCondition: PropTypes.bool,

	resourcesList: PropTypes.arrayOf(PropTypes.object),
	resourceSelected: PropTypes.object,

	operatorsList: PropTypes.arrayOf(PropTypes.object),
	operatorSelected: PropTypes.object,

	value: PropTypes.string,
};

const defaultProps = {
	assistiveText: {
		title: 'Condition',
		deleteIcon: 'Delete Condition',
	},
	isSubCondition: false,
	labels: {
		label: '',
		resource: 'Resource',
		operator: 'Operator',
		value: 'Value',
		deleteCondition: 'Delete Condition',
	},
	value: '',
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
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText
		);
		const labels = assign({}, defaultProps.labels, this.props.labels);
		return (
			<li
				className={classNames(
					`slds-expression__row`,
					this.props.isSubCondition ? 'slds-expression__row_group' : null,
					this.props.className
				)}
				id={this.getId()}
			>
				<fieldset>
					<legend className="slds-expression__legend">
						<span>{labels.label}</span>
						<span className="slds-assistive-text">{assistiveText.title}</span>
					</legend>
					<div className="slds-grid slds-gutters_xx-small">
						<div className="slds-col">
							<Combobox
								events={{
									onSelect: this.props.events.onChangeResource,
								}}
								multiple={false}
								variant="readonly"
								labels={{ label: labels.resource }}
								options={this.props.resourcesList}
								selection={[this.props.resourceSelected]}
							/>
						</div>
						<div className="slds-col slds-grow-none">
							<Combobox
								events={{
									onSelect: this.props.events.onChangeOperator,
								}}
								multiple={false}
								variant="readonly"
								labels={{ label: labels.operator }}
								options={this.props.operatorsList}
								selection={[this.props.operatorSelected]}
								singleInputDisabled={!this.props.resourceSelected}
							/>
						</div>
						<div className="slds-col">
							<Input
								label={labels.value}
								value={this.props.value}
								onChange={this.props.events.onChangeValue}
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
										onClick={this.props.events.onDelete}
										assistiveText={{
											icon: assistiveText.deleteIcon,
										}}
										title={labels.deleteCondition}
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
ExpressionCondition.defaultProps = defaultProps;

export default ExpressionCondition;
