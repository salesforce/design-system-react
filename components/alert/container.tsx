/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Alert Container Component

import React, { type ReactNode } from 'react';
import classNames from '../../utilities/class-names';
import { ALERT_CONTAINER } from '../../utilities/constants';

export interface AlertContainerProps {
	/**
	 * CSS classes to be added to tag with `.slds-notify_alert`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Alert components
	 */
	children?: ReactNode;
}

/**
 * A fixed container for alert banners.
 */
class AlertContainer extends React.Component<AlertContainerProps> {
	static displayName = ALERT_CONTAINER;

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

export default AlertContainer;
