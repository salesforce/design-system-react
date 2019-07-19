/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Visual Picker design pattern](https://lightningdesignsystem.com/components/visual-picker/) in React.
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import assign from 'lodash.assign';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import { EXPRESSION_GROUP } from '../../utilities/constants';

import Combobox from '../combobox';
import Button from '../button';

const propTypes = {
	/**
	 *  **Assistive text for accessibility.**
	 * * `label`: For users of assistive technology, assistive text for the expression group's label.
	 * * `addCondition`: For users of assistive technology, assistive text for the Add Condition button's icon.
	 * * `addGroup`: For users of assistive technology, assistive text for the Add Group button's icon.
	 */
	assistiveText: PropTypes.shape({
		label: PropTypes.string,
		addCondition: PropTypes.string,
		addGroup: PropTypes.string,
	}),
	/**
	 * HTML id for ExpressionGroup component.
	 */
	id: PropTypes.string,
	/**
	 * ExpressionGroup accepts `ExpressionCondition`. (Also accepts sub-`ExpressionGroup` if `isRoot`)
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

	events: PropTypes.shape({
		onChangeTrigger: PropTypes.func,
		onChangeCustomLogicValue: PropTypes.func,
		onAddCondition: PropTypes.func,
		onAddGroup: PropTypes.func,
	}),
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `addCondition`: Label for the Add Condition Button. Defaults to "Add Condition"
	 * * `addGroup`: Label for the Add Group Button. Defaults to "Add Group"
	 * * `customLogic`: Label for the text box for inputting `customLogicValue`, if the `triggerType` is `custom`. Defaults to "Custom Logic"
	 * * `label`: Label for the expression group, to indicate condition connectors based on the parent's trigger-type chosen. Defaults to ""
	 * * `takeAction`: Label for the `triggerType` selector. Defaults to "Take Action When"
	 */
	labels: PropTypes.shape({
		addCondition: PropTypes.string,
		addGroup: PropTypes.string,
		customLogic: PropTypes.string,
		label: PropTypes.string,
		takeAction: PropTypes.string,
	}),
	/**
	 * Whether the group is at root level
	 */
	isRoot: PropTypes.bool,
	/**
	 * Trigger type for the Group
	 */
	triggerType: PropTypes.oneOf(['all', 'any', 'custom', 'always', 'formula']),
	/**
	 * Custom trigger logic for the Group, if the `triggerType` is set to custom
	 */
	customLogicValue: PropTypes.string,
};

const defaultProps = {
	triggerType: 'all',
	isRoot: false,
	labels: {
		label: '',
		takeAction: 'Take Action When',
		customLogic: 'Custom Logic',
		addCondition: 'Add Condition',
		addGroup: 'Add Group',
		triggerAll: 'All Conditions Are Met',
		triggerAny: 'Any Condition Is Met',
		triggerCustom: 'Custom Logic Is Met',
		triggerAlways: 'Always (No Criteria)',
		triggerFormula: 'Formula Evaluates To True',
	},
};

/**
 * Expression Group Component
 */
class ExpressionGroup extends React.Component {
	/**
	 *  Return triggerType selected, processing the triggerType objects generated
	 */
	static triggerChange(event, data) {
		const selection = data.selection[0].id;
		let trigger = '';
		if (selection === '1') {
			trigger = 'all';
		} else if (selection === '2') {
			trigger = 'any';
		} else if (selection === '3') {
			trigger = 'custom';
		} else if (selection === '4') {
			trigger = 'always';
		} else if (selection === '5') {
			trigger = 'formula';
		}
		return trigger;
	}

	componentWillMount() {
		this.generatedId = shortid.generate();
	}

	/**
	 * Get the Expression Group's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	/**
	 * Generate and return trigger type objects, with labels either sent as props or using default props.
	 */
	getTriggers() {
		const labels = assign({}, defaultProps.labels, this.props.labels);
		return [
			{ id: '1', label: labels.triggerAll },
			{ id: '2', label: labels.triggerAny },
			{ id: '3', label: labels.triggerCustom },
			{ id: '4', label: labels.triggerAlways },
			{ id: '5', label: labels.triggerFormula },
		];
	}

	getTriggerSelection() {
		const selection = this.props.triggerType;
		const Triggers = this.getTriggers();
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

	render() {
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText
		);
		const labels = assign({}, defaultProps.labels, this.props.labels);

		const triggerCombobox = (
			<Combobox
				events={{
					onSelect: (event, data) =>
						this.props.events.onChangeTrigger(
							ExpressionGroup.triggerChange(event, data)
						),
				}}
				multiple={false}
				options={this.getTriggers()}
				variant="readonly"
				labels={{ label: labels.takeAction }}
				selection={this.getTriggerSelection()}
			/>
		);

		const buttons =
			this.props.triggerType !== 'always' &&
			this.props.triggerType !== 'formula' ? (
				<div className="slds-expression__buttons">
					<Button
						iconCategory="utility"
						iconName="add"
						iconPosition="left"
						label={labels.addCondition}
						assistiveText={{ icon: assistiveText.addCondition }}
						onClick={this.props.events.onAddCondition}
					/>
					{this.props.isRoot ? (
						<Button
							iconCategory="utility"
							iconName="add"
							iconPosition="left"
							label={labels.addGroup}
							assistiveText={{ icon: assistiveText.addGroup }}
							onClick={this.props.events.onAddGroup}
						/>
					) : null}
				</div>
			) : null;

		const body =
			this.props.triggerType !== 'always' ? (
				<>
					{this.props.triggerType === 'custom' ? (
						<div className="slds-expression__custom-logic">
							<div className="slds-form-element">
								<label
									className="slds-form-element__label"
									htmlFor={`text-input-id-${this.getId()}`}
								>
									{labels.customLogic}
								</label>
								<div className="slds-form-element__control">
									<input
										className="slds-input"
										type="text"
										id={`text-input-id-${this.getId()}`}
										value={this.props.customLogicValue}
										onChange={this.props.events.onChangeCustomLogicValue}
									/>
								</div>
							</div>
						</div>
					) : null}
					<ul>{this.props.children}</ul>
				</>
			) : null;

		return !this.props.isRoot ? (
			<li
				className={classNames('slds-expression__group', this.props.className)}
				id={this.getId()}
			>
				<fieldset>
					<legend className="slds-expression__legend slds-expression__legend_group">
						<span>{labels.label}</span>
						<span className="slds-assistive-text">{assistiveText.label}</span>
					</legend>
					<div className="slds-expression__options">{triggerCombobox}</div>
					<ul>{body}</ul>
					{buttons}
				</fieldset>
			</li>
		) : (
			<div className={classNames(this.props.className)} id={this.getId()}>
				<div className="slds-expression__options">{triggerCombobox}</div>
				{body}
				{buttons}
			</div>
		);
	}
}

ExpressionGroup.displayName = EXPRESSION_GROUP;
ExpressionGroup.propTypes = propTypes;
ExpressionGroup.defaultProps = defaultProps;

export default ExpressionGroup;
