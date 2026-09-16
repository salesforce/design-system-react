/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Toast Container Component

import React, { type ReactNode } from 'react';
import classNames from '../../utilities/class-names';
import { TOAST_CONTAINER } from '../../utilities/constants';

export interface ToastContainerProps {
	/**
	 * CSS classes to be added to tag with `.slds-notify-container`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Toast components
	 */
	children?: ReactNode;
}

/**
 * A fixed container for toast banners.
 */

class ToastContainer extends React.Component<ToastContainerProps> {
	static displayName = TOAST_CONTAINER;

	render() {
		return (
			<div
				className={classNames(
					'slds-notify-container',
					this.props.className as string
				)}
			>
				{this.props.children}
			</div>
		);
	}
}

export default ToastContainer;
