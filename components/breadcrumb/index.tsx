/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode, type ReactElement, type CSSProperties } from 'react';
import { BREADCRUMB } from '../../utilities/constants';
import Dropdown from '../menu-dropdown';

/**
 * Assistive text for Breadcrumb
 */
export interface BreadcrumbAssistiveText {
	/** Label for the breadcrumb navigation */
	label?: string;
}

/**
 * Props for the Breadcrumb component
 */
export interface BreadcrumbProps {
	/** Assistive text for accessibility */
	assistiveText?: BreadcrumbAssistiveText | string;
	/** Unique identifier for the breadcrumb */
	id?: string;
	/** Overflow dropdown menu for condensed breadcrumbs */
	overflowDropdownMenu?: ReactElement;
	/** Custom styles for the nav container */
	styleContainer?: CSSProperties;
	/** Array of anchor elements defining the breadcrumb path */
	trail: ReactNode[];
}

const defaultAssistiveText: BreadcrumbAssistiveText = {
	label: 'Breadcrumbs',
};

/**
 * Renders the overflow dropdown menu
 */
const getBreadcrumbDropdown = (
	overflowDropdownMenu: ReactElement,
	props: { id?: string }
) => {
	const baseProps = overflowDropdownMenu.props as Record<string, unknown>;
	const overflowDropdownMenuProps = {
		...baseProps,
		id: `${props.id}-dropdown`,
		iconCategory: 'utility' as const,
		iconName: 'threedots',
		iconVariant: 'bare' as const,
		threedots: true,
	};
	return (
		<li className="slds-breadcrumb__item">
			<Dropdown {...overflowDropdownMenuProps} />
		</li>
	);
};

/**
 * Use breadcrumbs to note the path of a record and help the user navigate back to the parent.
 */
const Breadcrumb = ({
	assistiveText: propAssistiveText,
	id,
	overflowDropdownMenu,
	styleContainer,
	trail,
}: BreadcrumbProps): React.ReactElement => {
	const assistiveTextLabel =
		typeof propAssistiveText === 'string'
			? propAssistiveText
			: {
					...defaultAssistiveText,
					...propAssistiveText,
			  }.label;

	return (
		<nav
			role="navigation"
			aria-label={assistiveTextLabel}
			style={styleContainer}
		>
			<ol className="slds-breadcrumb slds-list_horizontal">
				{overflowDropdownMenu &&
					getBreadcrumbDropdown(overflowDropdownMenu, { id })}
				{trail.map((crumb, index) => (
					<li
						key={index}
						className="slds-breadcrumb__item"
					>
						{crumb}
					</li>
				))}
			</ol>
		</nav>
	);
};

Breadcrumb.displayName = BREADCRUMB;

export default Breadcrumb;

