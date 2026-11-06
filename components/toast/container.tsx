/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Toast Container Component

import React, { forwardRef, type ReactNode } from 'react';
import classNames from 'classnames';
import { TOAST_CONTAINER } from '../../utilities/constants';

export interface ToastContainerProps {
	/**
	 * CSS classes to be added to tag with `.slds-notify_container`.
	 */
	className?: string | string[] | Record<string, boolean>;
	/**
	 * Toast components
	 */
	children?: ReactNode;
}

/**
 * A fixed container for toast banners. `ref` is the root element.
 */
const ToastContainer = forwardRef<HTMLDivElement, ToastContainerProps>(
	({ children, className }, ref) => (
		<div
			className={classNames('slds-notify_container', className as string)}
			ref={ref}
		>
			{children}
		</div>
	)
);

ToastContainer.displayName = TOAST_CONTAINER;

export default ToastContainer;
