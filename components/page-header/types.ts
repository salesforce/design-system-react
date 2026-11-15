/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { ReactNode } from 'react';

export interface PageHeaderInfoProps {
	/**
	 * Optional class name
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Contents of info section
	 */
	content?: ReactNode;
	/**
	 * Variant passed down from page header
	 */
	variant?: string;
}

export interface PageHeaderTitleProps {
	/**
	 * Sets the vertical alignment on the title
	 */
	align?: 'top' | 'middle' | 'bottom';
	/**
	 * Optional class name
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * The title content
	 */
	content?: ReactNode;
	/**
	 * Label node, for variants that require a label within the title
	 */
	label?: ReactNode;
	/**
	 * Sets whether the title will truncate its content responsively.
	 */
	truncate?: boolean;
}

export interface PageHeaderDetailBlockProps {
	/**
	 * Optional class name
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * The content property can be a string or a React element
	 */
	content?: ReactNode;
	/**
	 * Sets the 'flavor' of a block, which adds the following sizing class: `slds-size_${flavor}`
	 */
	flavor?: `${number}-of-${number}`;
	/**
	 * Sets the label of a detail block
	 */
	label?: ReactNode;
	/**
	 * Sets whether the fields truncate
	 */
	truncate?: boolean;
}

export interface PageHeaderDetailRowProps {
	children?: ReactNode;
	/**
	 * Optional class name
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * An array of detail blocks
	 */
	details?: (PageHeaderDetailBlockProps & { id?: string })[];
}
