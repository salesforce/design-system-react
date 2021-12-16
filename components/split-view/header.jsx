/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import classNames from 'classnames';
import PageHeader from '../page-header';

import { SPLIT_VIEW_HEADER } from '../../utilities/constants';

const propTypes = {};

const defaultProps = {};
/**
 * The Split View Header takes the same properties as the [PageHeader](https://react.lightningdesignsystem.com/components/page-headers/) component.
 */
const SplitViewHeader = ({ className, ...rest }) => (
	<PageHeader
		className={classNames(
			'slds-split-view__header slds-has-bottom-magnet',
			className
		)}
		{...rest}
	/>
);

SplitViewHeader.displayName = SPLIT_VIEW_HEADER;
SplitViewHeader.propTypes = propTypes;
SplitViewHeader.defaultProps = defaultProps;

export default SplitViewHeader;
