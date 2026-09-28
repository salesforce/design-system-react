/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { forwardRef } from 'react';
import classNames from 'classnames';
import { LAYOUT_ITEM } from '../../utilities/constants';
import checkProps from './check-props';
import type { Flexibility, LayoutItemPadding, LayoutItemProps } from './types';

const FLEX_CLASS: Record<Flexibility, string> = {
	auto: 'slds-col',
	grow: 'slds-grow',
	shrink: 'slds-shrink',
	'no-grow': 'slds-grow-none',
	'no-shrink': 'slds-shrink-none',
	'no-flex': 'slds-no-flex',
};

const PADDING_CLASS: Record<LayoutItemPadding, string[]> = {
	'horizontal-small': ['slds-p-left_small', 'slds-p-right_small'],
	'horizontal-medium': ['slds-p-left_medium', 'slds-p-right_medium'],
	'horizontal-large': ['slds-p-left_large', 'slds-p-right_large'],
	'around-small': ['slds-p-around_small'],
	'around-medium': ['slds-p-around_medium'],
	'around-large': ['slds-p-around_large'],
};

const toFlexibilityArray = (
	flexibility?: Flexibility | Flexibility[]
): Flexibility[] => {
	if (flexibility == null) return [];
	return Array.isArray(flexibility) ? flexibility : [flexibility];
};

/**
 * LayoutItem is a child of Layout. It mirrors `lightning-layout-item`.
 * Note: it has no always-on `slds-col` base class — `slds-col` is emitted only
 * when `flexibility` includes `"auto"`, matching LBC exactly.
 */
const LayoutItem = forwardRef<HTMLDivElement, LayoutItemProps>((props, ref) => {
	const {
		size,
		smallDeviceSize,
		mediumDeviceSize,
		largeDeviceSize,
		flexibility,
		padding,
		alignmentBump,
		className,
		children,
		...rest
	} = props;

	checkProps(LAYOUT_ITEM, props);

	const computed = classNames(
		// order matches LBC: padding, flexibility, size, bump
		padding ? PADDING_CLASS[padding] : undefined,
		toFlexibilityArray(flexibility).map((token) => FLEX_CLASS[token]),
		size ? `slds-size_${size}-of-12` : undefined,
		smallDeviceSize ? `slds-small-size_${smallDeviceSize}-of-12` : undefined,
		mediumDeviceSize ? `slds-medium-size_${mediumDeviceSize}-of-12` : undefined,
		largeDeviceSize ? `slds-large-size_${largeDeviceSize}-of-12` : undefined,
		alignmentBump ? `slds-col_bump-${alignmentBump}` : undefined,
		className
	);

	return (
		<div ref={ref} className={computed || undefined} {...rest}>
			{children}
		</div>
	);
});

LayoutItem.displayName = LAYOUT_ITEM;

export default LayoutItem;
