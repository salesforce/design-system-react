/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode } from 'react';
import classnames from 'classnames';

// ## Constants
import { PAGE_HEADER_CONTROL } from '../../utilities/constants';

export interface ControlProps {
	/**
	 * Optional class name
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Content rendered within the control wrapper.
	 */
	children?: ReactNode;
}

/**
 * The PageHeaderControl component is used to wrap individual controls within PageHeader 'actions' and 'controls' sections.
 */
const Control = (props: ControlProps): React.ReactElement => (
	<div className={classnames('slds-page-header__control', props.className as string)}>
		{props.children}
	</div>
);

Control.displayName = PAGE_HEADER_CONTROL;

export default Control;
