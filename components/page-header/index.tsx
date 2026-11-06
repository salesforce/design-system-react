/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useEffect, type ReactNode, type ReactElement } from 'react';
import classnames from 'classnames';
import { PAGE_HEADER } from '../../utilities/constants';
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
import type { PageHeaderVariantProps } from './private/types';

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
	/** Whether content is truncated */
	truncate?: boolean;
	/** Width of the block, appended as `slds-size_{flavor}`, such as `1-of-4` */
	flavor?: `${number}-of-${number}`;
	/** Stable key for the block. Defaults to its index. */
	id?: string;
}

/** Props every variant takes. */
interface PageHeaderCommonProps {
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Whether joined with SimpleDataTable */
	joined?: boolean;
	/** Title text or element */
	title?: ReactNode;
}

/** Actions shown in the upper right of the `object-home`, `record-home` and `related-list` variants. */
interface PageHeaderActionsProps {
	/**
	 * Actions shown in the upper right. Pass a `PageHeaderControl`, or a fragment
	 * whose children are all `PageHeaderControl` elements.
	 */
	actions?: ReactNode;
	/** @deprecated Use `actions` instead. */
	onRenderActions?: () => ReactNode;
}

/** Controls shown in the lower right (upper right for the `base` variant). */
interface PageHeaderControlsProps {
	/**
	 * Controls shown in the lower right (upper right for the `base` variant).
	 * Pass a `PageHeaderControl`, or a fragment whose children are all
	 * `PageHeaderControl` elements.
	 */
	controls?: ReactNode;
	/** @deprecated Use `controls` instead. */
	onRenderControls?: () => ReactNode;
}

/** The plain header, and the default. It has no actions, label, trail or details. */
interface PageHeaderBaseVariantProps
	extends PageHeaderCommonProps, PageHeaderControlsProps {
	/** Page header variant */
	variant?: 'base';
	/** Icon element */
	icon?: ReactElement;
	/** Info text or element */
	info?: ReactNode;
	actions?: never;
	details?: never;
	label?: never;
	onRenderActions?: never;
	nameSwitcherDropdown?: never;
	trail?: never;
}

/** A list page header with a name switcher and a breadcrumb trail. */
interface PageHeaderObjectHomeVariantProps
	extends
		PageHeaderCommonProps,
		PageHeaderActionsProps,
		PageHeaderControlsProps {
	/** Page header variant */
	variant: 'object-home';
	/** Icon element */
	icon?: ReactElement;
	/** Info text or element */
	info?: ReactNode;
	/** Label text or element */
	label?: ReactNode;
	/** Name switcher dropdown */
	nameSwitcherDropdown?: ReactNode;
	/** Breadcrumb trail */
	trail?: ReactNode[];
	details?: never;
}

/** A record page header with detail blocks. */
interface PageHeaderRecordHomeVariantProps
	extends PageHeaderCommonProps, PageHeaderActionsProps {
	/** Page header variant */
	variant: 'record-home';
	/** Icon element */
	icon?: ReactElement;
	/** Label text or element */
	label?: ReactNode;
	/** Detail blocks */
	details?: PageHeaderDetail[];
	controls?: never;
	info?: never;
	onRenderControls?: never;
	nameSwitcherDropdown?: never;
	trail?: never;
}

/** A related list header. It has no icon. */
interface PageHeaderRelatedListVariantProps
	extends
		PageHeaderCommonProps,
		PageHeaderActionsProps,
		PageHeaderControlsProps {
	/** Page header variant */
	variant: 'related-list';
	/** Info text or element */
	info?: ReactNode;
	/** Label text or element */
	label?: ReactNode;
	/** Breadcrumb trail */
	trail?: ReactNode[];
	details?: never;
	icon?: never;
	nameSwitcherDropdown?: never;
}

/**
 * Props for the PageHeader component: a union on `variant`, so a prop that a
 * variant ignores is a compile error.
 */
export type PageHeaderProps =
	| PageHeaderBaseVariantProps
	| PageHeaderObjectHomeVariantProps
	| PageHeaderRecordHomeVariantProps
	| PageHeaderRelatedListVariantProps;

/**
 * The PageHeader component adds PageHeader with multiple variants:
 * base, object-home, record-home, and related-list.
 */
const PageHeader = (props: PageHeaderProps): React.ReactElement => {
	const {
		actions: actionsProp,
		className,
		controls: controlsProp,
		details,
		icon,
		info,
		joined,
		label,
		nameSwitcherDropdown,
		onRenderActions,
		onRenderControls,
		title,
		trail,
		variant = 'base',
	} = props as PageHeaderVariantProps &
		Pick<PageHeaderCommonProps, 'className' | 'joined'> &
		PageHeaderActionsProps &
		PageHeaderControlsProps;
	const actions = actionsProp ?? onRenderActions?.();
	const controls = controlsProp ?? onRenderControls?.();
	useEffect(() => {
		checkProps(
			PAGE_HEADER,
			{ actions, controls, onRenderActions, onRenderControls, variant },
			componentDoc
		);
	}, [actions, controls, onRenderActions, onRenderControls, variant]);

	const classes = classnames(
		'slds-page-header',
		{
			'slds-page-header_record-home': variant === 'record-home',
			'slds-page-header_related-list': variant === 'related-list',
			'slds-page-header_joined': joined,
		},
		className as string
	);

	const variantProps = {
		actions,
		controls,
		details,
		icon,
		info,
		label,
		nameSwitcherDropdown,
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
