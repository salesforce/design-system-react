/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Select Component

// Implements the [Select design pattern](https://www.lightningdesignsystem.com/components/select/) in React.

import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/class-names';

const propTypes = {
	/**
	 * Shows red borders in the input element is there is an error
	 */
	hasError: PropTypes.bool,
	/**
	 * Shows the content of the Select component.
	 */
	children: PropTypes.node.isRequired,
};

class Select extends React.Component {
	render() {
		return (
			<div
				className={classNames('slds-form-element', {
					'slds-has-error': this.props.hasError,
				})}
			>
				{this.props.children}
			</div>
		);
	}
}

Select.propTypes = propTypes;

export default Select;
