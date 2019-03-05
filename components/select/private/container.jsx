/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from '../../../utilities/class-names';

const propTypes = {
	/**
	 * The `aria-describedby` attribute is used to indicate the IDs of the elements that describe the object. It is used to establish a relationship between widgets or groups and text that described them. This is very similar to aria-labelledby: a label describes the essence of an object, while a description provides more information that the user might need.
	 */
	'aria-describedby': PropTypes.string,
	/**
	 * Every select input must have a unique ID in order to support keyboard navigation and ARIA support.
	 */
	id: PropTypes.string,
	/**
	 * Highlights the select input as a required field (does not perform any validation).
	 */
	required: PropTypes.bool,
	/**
	 * Disables the select input and prevents editing the contents.
	 */
	disabled: PropTypes.bool,
	/**
	 * Displays options in a multiple selection narrow format.
	 */
	isMultipleSelection: PropTypes.boolean,
	/**
	 * Select options.
	 */
	options: PropTypes.arrayOf(PropTypes.string),
};

class SelectContainer extends React.Component {
	componentWillMount() {
		this.generatedId = shortid.generate();
		if (this.props.errorText) {
			this.generatedErrorId = shortid.generate();
		}
	}

	getId = () => this.props.id || this.generatedId;

	getOptions = () =>
		this.props.options.map((optionValue) => <option>{optionValue}</option>);

	render() {
		return (
			<div className="slds-form-element__control">
				<div
					className={classNames({
						'slds-select_container': !this.props.isMultipleSelection,
					})}
				>
					<select
						className="slds-select"
						id={this.getId()}
						required={this.props.required || this.props.errorText}
						multiple={this.props.isMultipleSelection}
						disabled={this.props.disabled}
						aria-describedBy={this.props['aria-describedby']}
					>
						{this.getOptions()}
					</select>
				</div>
			</div>
		);
	}
}

SelectContainer.propTypes = propTypes;

export default SelectContainer;
