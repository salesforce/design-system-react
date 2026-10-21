/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useEffect, type ReactNode, type ReactElement } from 'react';
import classnames from 'classnames';
import { PAGE_HEADER } from '../../utilities/constants';
// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';

// Private components - keep JSX for now
import Info from './private/info';
import Title from './private/title';
import DetailRow from './private/detail-row';
import DetailBlock from './private/detail-block';
import Base from './private/base';
import RecordHome from './private/record-home';
import ObjectHome from './private/object-home';
import RelatedList from './private/related-list';

/**
 * Page header variant types
 */
export type PageHeaderVariant =
	'base' | 'object-home' | 'record-home' | 'related-list';

/**
 * Detail block structure
 */
export interface PageHeaderDetail {
	/** Detail label */
	label?: ReactNode;
	/** Detail content */
	content?: ReactNode;
	/** Whether content is truncated. Defaults to truncating when omitted. */
	isTruncated?: boolean;
	/** @deprecated Use `isTruncated` instead. */
	truncate?: boolean;
	/** Flavor modifier */
	flavor?: string;
}

/**
 * Props for the PageHeader component
 */
export interface PageHeaderProps {
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Detail blocks for record-home variant */
	details?: PageHeaderDetail[];
	/** Icon element */
	icon?: ReactElement;
	/** Info text or element */
	info?: ReactNode;
	/** Whether joined with SimpleDataTable */
	isJoined?: boolean;
	/** @deprecated Use `isJoined` instead. */
	joined?: boolean;
	/** Label text or element */
	label?: ReactNode;
	/** Name switcher dropdown for object-home variant */
	nameSwitcherDropdown?: ReactNode;
	/** Render function for action controls (upper right) */
	onRenderActions?: () => ReactNode;
	/** Render function for controls (lower right) */
	onRenderControls?: () => ReactNode;
	/** Title text or element */
	title?: ReactNode;
	/** Breadcrumb trail */
	trail?: ReactElement[];
	/** Page header variant */
	variant?: PageHeaderVariant;
}

/**
 * The PageHeader component adds PageHeader with multiple variants:
 * base, object-home, record-home, and related-list.
 */
const PageHeader = (props: PageHeaderProps): React.ReactElement => {
	const {
		className,
		details,
		icon,
		info,
		isJoined: isJoinedProp,
		joined,
		label,
		nameSwitcherDropdown,
		onRenderActions,
		onRenderControls,
		title,
		trail,
		variant = 'base',
	} = props;
	const isJoined = isJoinedProp ?? joined;

	// Check props on mount
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(checkProps as any)(PAGE_HEADER, props, componentDoc);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const classes = classnames(
		'slds-page-header',
		{
			'slds-page-header_record-home': variant === 'record-home',
			'slds-page-header_related-list': variant === 'related-list',
			'slds-page-header_joined': isJoined,
		},
		className as string
	);

	const variantProps = {
		details,
		icon,
		info,
		label,
		nameSwitcherDropdown,
		onRenderActions,
		onRenderControls,
		title,
		trail,
		variant,
	};

	let VariantComponent: React.ComponentType<typeof variantProps>;

	switch (variant) {
		case 'object-home':
			VariantComponent = ObjectHome;
			break;
		case 'record-home':
			VariantComponent = RecordHome;
			break;
		case 'related-list':
			VariantComponent = RelatedList;
			break;
		default:
			VariantComponent = Base;
	}

	return (
		<div className={classes}>
			<VariantComponent {...variantProps} />
		</div>
	);
};

PageHeader.displayName = PAGE_HEADER;

export default PageHeader;

// NOTE: these are private components and are prone to breaking changes.
// Do not use these in your app! These exports are for legacy use only.
export { Info, Title, DetailRow, DetailBlock };
