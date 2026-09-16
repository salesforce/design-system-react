/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { type ReactElement, type ReactNode } from 'react';

import { type PageHeaderDetail, type PageHeaderVariant } from '../index';

/**
 * Props shared by the private page-header variant components (base,
 * object-home, record-home, related-list). Individual variants read a subset.
 * Includes the legacy `icon*` and `contentRight`/`navRight` compatibility
 * props that predate `onRenderActions`/`onRenderControls`.
 *
 * The `details`/`trail`/`variant` field types mirror the public
 * `PageHeaderProps` so the parent `PageHeader` can assign each variant to a
 * single `ComponentType` without contravariance errors.
 */
export interface PageHeaderVariantProps {
	/** The page header icon element */
	icon?: ReactElement;
	/** Backwards-compatible icon category */
	iconCategory?: string;
	/** Backwards-compatible icon name */
	iconName?: string;
	/** Backwards-compatible icon position */
	iconPosition?: string;
	/** Backwards-compatible icon size */
	iconSize?: string;
	/** Backwards-compatible icon variant */
	iconVariant?: string;
	/** The info content */
	info?: ReactNode;
	/** The label content */
	label?: ReactNode;
	/** The title content */
	title?: ReactNode;
	/** Detail blocks (record-home variant) */
	details?: PageHeaderDetail[];
	/** Dropdown for the object-home name switcher */
	nameSwitcherDropdown?: ReactNode;
	/** An array of react elements, presumably anchor <a> elements. */
	trail?: ReactElement[];
	/** The component variant */
	variant?: PageHeaderVariant;
	/** Render prop for the actions column */
	onRenderActions?: () => ReactNode;
	/** Render prop for the controls column */
	onRenderControls?: () => ReactNode;
	/** Legacy content for the actions column */
	contentRight?: ReactNode;
	/** Legacy content for the controls column */
	navRight?: ReactNode;
}
