/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { HTMLAttributes, ReactNode } from 'react';

/** Fluidity tokens for LayoutItem, mirroring lightning-layout-item `flexibility`. */
export type Flexibility =
	'auto' | 'shrink' | 'no-shrink' | 'grow' | 'no-grow' | 'no-flex';

/** A 12-column grid size, 1–12. */
export type LayoutItemSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** LayoutItem padding tokens, mirroring lightning-layout-item `padding`. */
export type LayoutItemPadding =
	| 'horizontal-small'
	| 'horizontal-medium'
	| 'horizontal-large'
	| 'around-small'
	| 'around-medium'
	| 'around-large';

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
	/** Horizontal distribution of items. Unset = start. */
	horizontalAlign?: 'center' | 'space' | 'spread' | 'end';
	/** Vertical alignment of items. */
	verticalAlign?: 'start' | 'center' | 'end' | 'stretch';
	/** Pull items to the layout boundaries (pairs with LayoutItem `padding`). */
	pullToBoundary?: 'small' | 'medium' | 'large';
	/** Wrap items to subsequent rows when they exceed the layout width. */
	multipleRows?: boolean;
	/** Additional class names applied to the root grid. */
	className?: string;
	/** Layout content, typically `LayoutItem` elements. */
	children?: ReactNode;
}

export interface LayoutItemProps extends HTMLAttributes<HTMLDivElement> {
	/** Relative width in a 12-column grid, all device types. 1–12. */
	size?: LayoutItemSize;
	/** Width on small devices and up (requires `size`). 1–12. */
	smallDeviceSize?: LayoutItemSize;
	/** Width on medium devices and up (requires `size`). 1–12. */
	mediumDeviceSize?: LayoutItemSize;
	/** Width on large devices and up (requires `size`). 1–12. */
	largeDeviceSize?: LayoutItemSize;
	/** Fluidity: a single token or an array of tokens. `auto` => `slds-col`. */
	flexibility?: Flexibility | Flexibility[];
	/** Padding on the item. */
	padding?: LayoutItemPadding;
	/** Bump alignment of adjacent items (the SLDS `_bump` utility). */
	alignmentBump?: 'left' | 'top' | 'right' | 'bottom';
	/** Additional class names applied to the root. */
	className?: string;
	/** Item content. */
	children?: ReactNode;
}
