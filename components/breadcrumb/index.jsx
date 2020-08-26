/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-redundant-roles */

// # Breadcrumbs

// Implements the [Breadcrumbs design pattern](https://www.lightningdesignsystem.com/components/breadcrumbs) in React.
// Based on SLDS v2.1.0-rc.2

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';

// ## Constants
import { BREADCRUMB } from '../../utilities/constants';
import Dropdown from './../menu-dropdown';

const propTypes = {
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `label`: The assistive text for the breadcrumb trail.
	 */
	assistiveText: PropTypes.shape({
		label: PropTypes.string,
	}),
	/**
	 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
	 */
	id: PropTypes.string,
	/**
	 * Overflow menu of the type [Dropdown](/components/menu-dropdowns)
	 */
	overflowDropdownMenu: PropTypes.node,
	/**
	 * Custom styles to be passed to the containing `nav` tag
	 */
	styleContainer: PropTypes.object,
	/**
	 * An array of anchor elements that define the path to the current record.
	 */
	trail: PropTypes.array.isRequired,
};

const defaultProps = {
	assistiveText: {
		label: 'Breadcrumbs',
	},
};

const getBreadcrumbDropdown = (overflowDropdownMenu, props) => {
	const overflowDropdownMenuProps = {
		...overflowDropdownMenu.props,
		id: `${props.id}-dropdown`,
		iconCategory: 'utility',
		iconName: 'threedots',
		iconVariant: 'bare',
		threedots: true,
	};
	return (
		<li className="slds-breadcrumb__item">
			<Dropdown {...overflowDropdownMenuProps} />
		</li>
	);
};

/**
 * Use breadcrumbs to note the path of a record and help the user to navigate back to the parent.Breadcrumb based on SLDS 2.1.0-dev
 */
const Breadcrumb = (props) => {
	checkProps(BREADCRUMB, props, componentDoc);

	const { overflowDropdownMenu, trail } = props;
	const assistiveText =
		typeof props.assistiveText === 'string'
			? props.assistiveText
			: {
					...defaultProps.assistiveText,
					...props.assistiveText,
			  }.label;

	return (
		<nav
			role="navigation"
			aria-label={assistiveText}
			style={props.styleContainer}
		>
			<ol className="slds-breadcrumb slds-list_horizontal">
				{overflowDropdownMenu &&
					getBreadcrumbDropdown(overflowDropdownMenu, props)}
				{trail.map((crumb, index) => (
					/* eslint-disable react/no-array-index-key */
					<li
						key={index} // There isn't any better reasonable way to identity these
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
Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

export default Breadcrumb;
