/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Radio Button Group design pattern](https://lightningdesignsystem.com/components/radio-button-group/) in React.
// Based on SLDS v2.5.0

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import shortid from 'shortid';
import assign from 'lodash.assign';

import { RADIO_BUTTON_GROUP } from '../../utilities/constants';

const propTypes = {
	/**
	 * Children are expected to be Radio components.
	 */
	children: PropTypes.node.isRequired,
	/**
	 * Custom CSS classes added to `slds-radio_button-group` node.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `error`: Message to display when any of Checkboxes are in an error state.
	 * * `label`: This label appears above the button group.
	 */
	labels: PropTypes.shape({
		error: PropTypes.string,
		label: PropTypes.string,
	}),
	/**
	 * This event fires when the radio selection changes.
	 */
	onChange: PropTypes.func,
	/**
	 * Disable all radio inputs.
	 */
	disabled: PropTypes.bool,
	/**
	 * Adds an indicator that this field is required.
	 */
	required: PropTypes.bool,
	/**
	 * The name of this radio group.
	 */
	name: PropTypes.string,
	/**
	 * The ID of the error message, for linking to radio inputs with aria-describedby.
	 */
	errorId: PropTypes.string,
};

const defaultProps = { labels: {} };

/**
 * A styled select list that can have a single entry checked at any one time.
 * The RadioButtonGroup component wraps [Radio](/components/radios) components, which should be used as children.
 */
class RadioButtonGroup extends React.Component {
	constructor (props) {
		super(props);

		// Merge objects of strings with their default object
		this.labels = this.props.labels
			? assign({}, defaultProps.labels, this.props.labels)
			: defaultProps.labels;

		this.generatedName = shortid.generate();
		this.generatedErrorId = this.labels.error ? shortid.generate() : null;
	}

	getErrorId () {
		if (this.hasError()) {
			return this.props.errorId || this.generatedErrorId;
		}
		return undefined;
	}

	getName () {
		return this.props.name || this.generatedName;
	}

	hasError () {
		return !!this.labels.error;
	}

	render () {
		const children = React.Children.map(this.props.children, (child) =>
			React.cloneElement(child, {
				name: this.getName(),
				onChange: this.props.onChange,
				'aria-describedby': this.getErrorId(),
				disabled: this.props.disabled,
			})
		);

		return (
			<fieldset
				className={classNames('slds-form-element', {
					'slds-has-error': this.labels.error,
				})}
			>
				<legend className="slds-form-element__legend slds-form-element__label">
					{this.props.required ? (
						<abbr className="slds-required" title="required">
							*
						</abbr>
					) : null}
					{this.labels.label}
				</legend>
				<div
					className={classNames(
						'slds-form-element__control',
						this.props.className
					)}
				>
					<div className="slds-radio_button-group">{children}</div>
					{this.labels.error ? (
						<div id={this.getErrorId()} className="slds-form-element__help">
							{this.labels.error}
						</div>
					) : null}
				</div>
			</fieldset>
		);
	}
}

RadioButtonGroup.displayName = RADIO_BUTTON_GROUP;
RadioButtonGroup.propTypes = propTypes;
RadioButtonGroup.defaultProps = defaultProps;

export default RadioButtonGroup;
