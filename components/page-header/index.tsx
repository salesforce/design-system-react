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
	/** Flavor modifier */
	flavor?: string;
}

/**
 * Props for the PageHeader component
 */
export interface PageHeaderProps {
	/**
	 * Actions shown in the upper right. Pass a `PageHeaderControl`, or a fragment
	 * whose children are all `PageHeaderControl` elements.
	 */
	actions?: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/**
	 * Controls shown in the lower right (upper right for the `base` variant).
	 * Pass a `PageHeaderControl`, or a fragment whose children are all
	 * `PageHeaderControl` elements.
	 */
	controls?: ReactNode;
	/** Detail blocks for record-home variant */
	details?: PageHeaderDetail[];
	/** Icon element */
	icon?: ReactElement;
	/** Info text or element */
	info?: ReactNode;
	/** Whether joined with SimpleDataTable */
	joined?: boolean;
	/** Label text or element */
	label?: ReactNode;
	/** Name switcher dropdown for object-home variant */
	nameSwitcherDropdown?: ReactNode;
	/** @deprecated Use `actions` instead. */
	onRenderActions?: () => ReactNode;
	/** @deprecated Use `controls` instead. */
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
const PageHeader = ({
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
}: PageHeaderProps): React.ReactElement => {
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
