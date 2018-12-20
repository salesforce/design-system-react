/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Alert Container Component

import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/class-names';
import { ALERT_CONTAINER } from '../../utilities/constants';

const propTypes = {
	/**
	 * CSS classes to be added to tag with `.slds-notify_alert`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Alert components
	 */
	children: PropTypes.node,
};

/**
 * A fixed container for alert banners.
 */

class AlertContainer extends React.Component {
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

AlertContainer.displayName = ALERT_CONTAINER;
AlertContainer.propTypes = propTypes;

export default AlertContainer;
