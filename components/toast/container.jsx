/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Toast Container Component

import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/class-names';
import { TOAST_CONTAINER } from '../../utilities/constants';

const propTypes = {
	/**
	 * CSS classes to be added to tag with `.slds-notify-container`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Toast components
	 */
	children: PropTypes.node,
};

/**
 * A fixed container for toast banners.
 */

class ToastContainer extends React.Component {
	render() {
		return (
			<div
				className={classNames('slds-notify-container', this.props.className)}
			>
				{this.props.children}
			</div>
		);
	}
}

ToastContainer.displayName = TOAST_CONTAINER;
ToastContainer.propTypes = propTypes;

export default ToastContainer;
