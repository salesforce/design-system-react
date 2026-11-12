/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import classNames from 'classnames';
import PageHeader, { type PageHeaderProps } from '../page-header';

import { SPLIT_VIEW_HEADER } from '../../utilities/constants';

export interface SplitViewHeaderProps extends PageHeaderProps {
	/**
	 * CSS classes to be added to the wrapping `PageHeader`.
	 */
	className?: PageHeaderProps['className'];
}

/**
 * The Split View Header takes the same properties as the [PageHeader](https://react.lightningdesignsystem.com/components/page-headers/) component.
 */
const SplitViewHeader = ({
	className,
	...rest
}: SplitViewHeaderProps): React.ReactElement => (
	<PageHeader
		className={classNames(
			'slds-split-view__header slds-has-bottom-magnet',
			className
		)}
		{...rest}
	/>
);

SplitViewHeader.displayName = SPLIT_VIEW_HEADER;

export default SplitViewHeader;
