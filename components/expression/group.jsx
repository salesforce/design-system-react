/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Visual Picker design pattern](https://lightningdesignsystem.com/components/visual-picker/) in React.
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
import { EXPRESSION_GROUP } from '../../utilities/constants';

import Combobox from '../combobox';
import Button from '../button';


const propTypes = {
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

	triggerType: PropTypes.oneOf(["all", "any", "custom", "always", "formula"]),
	onChangeTrigger: PropTypes.func,

	onAddCondition: PropTypes.func,
	onAddGroup: PropTypes.func,

	labels: PropTypes.shape({
		takeAction: PropTypes.string,
		addCondition: PropTypes.string,
		addGroup: PropTypes.string
	})

};

const defaultProps = {
	triggerType: "all"
};

const Triggers = [
	{
		id: '1',
		label: 'All Conditions Are Met',
	},
	{
		id: '2',
		label: 'Any Condition Is Met',
	},
	{
		id: '3',
		label: 'Custom Logic Is Met',
	},
	{
		id: '4',
		label: 'Always (No Criteria)',
	},
	{
		id: '5',
		label: 'Formula Evaluates To True',
	},
];


/**
 * Expression Group Component
 */
class ExpressionGroup extends React.Component {

	componentWillMount() {
		this.generatedId = shortid.generate();
	}

	/**
	 * Get the Expression Group's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	getTriggerSelection()
	{
		const selection = this.props.triggerType;
		const t = [];
		if (selection === 'all') {
			t.push(Triggers[0]);
		} else if (selection === 'any') {
			t.push(Triggers[1]);
		} else if (selection === 'custom') {
			t.push(Triggers[2]);
		} else if (selection === 'always') {
			t.push(Triggers[3]);
		} else if (selection === 'formula') {
			t.push(Triggers[4]);
		}
		return t;
	}

	triggerChange(event, data)
	{
		const selection = data.selection[0].id;
		let trigger = "";
		if(selection === '1') {
				trigger = "all"
		} else if(selection === '2'){
				trigger = "any"
		} else if(selection === '3'){
			  trigger = "custom"
		} else if(selection === '4'){
			  trigger = "always"
		} else if(selection === '5'){
			trigger = "formula"
		}
		// eslint-disable-next-line no-unused-expressions
		typeof this.props.onChangeTrigger === "function" ? this.props.onChangeTrigger(trigger) : null;
	}

	render() {

		const triggerCombobox = (<Combobox
			events={{
				onSelect: (event, data) => this.triggerChange(event, data)
			}}
			multiple={false}
			options={Triggers}
			variant="readonly"
			labels={{ label: this.props.labels ? this.props.labels.takeAction : "Take Action When" }}
			selection={this.getTriggerSelection()}
		/>);

		const buttons = (<div className="slds-expression__buttons">
			<Button
				iconCategory="utility"
				iconName="add"
				iconPosition="left"
				label={this.props.labels ? this.props.labels.addCondition : "Add Condition" }
				onClick={() => {
					// eslint-disable-next-line no-unused-expressions
					typeof this.props.onAddCondition === "function" ? this.props.onAddCondition() : null;
				}}
			/>
			{ !this.props.child ? (
				<Button
					iconCategory="utility"
					iconName="add"
					iconPosition="left"
					label={this.props.labels ? this.props.labels.addGroup : "Add Group" }
					onClick={() => {
						// eslint-disable-next-line no-unused-expressions
						typeof this.props.onAddGroup === "function" ? this.props.onAddGroup() : null;
					}}
				/>) : null
			}
		</div>);

		return (
			 this.props.child ? (
				 <li className="slds-expression__group">
					 <fieldset>
						 <legend className="slds-expression__legend slds-expression__legend_group">
							<span>AND</span>
							<span className="slds-assistive-text">Condition Group 1</span>
						 </legend>
						 <div className="slds-expression__options">
							 {triggerCombobox}
						 </div>
						 <ul>
										 {this.props.children}
							</ul>
							{buttons}
					 </fieldset>
				 </li>
				) : (
					<div className={classNames(this.props.className)} id={this.getId()}>
						<div className="slds-expression__options">
							{triggerCombobox}
						</div>
						<ul>
							{this.props.children}
						</ul>
						{buttons}
					</div>
				)
		)
	}
}

ExpressionGroup.displayName = EXPRESSION_GROUP;
ExpressionGroup.propTypes = propTypes;
ExpressionGroup.defaultProps = defaultProps;

export default ExpressionGroup;
