/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Breadcrumbs

// Implements the [Breadcrumbs design pattern](https://www.lightningdesignsystem.com/components/breadcrumbs) in React.
// Based on SLDS v2.1.0-rc.2

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ## Constants
import { BREADCRUMB } from '../../utilities/constants';

/**
 * Use breadcrumbs to note the path of a record and help the user to navigate back to the parent.Breadcrumb based on SLDS 2.1.0-dev
 */
const Breadcrumb = (props) => {
	const { assistiveText, trail } = props;

	return (
		<nav role="navigation" aria-label={assistiveText}>
			<ol className="slds-breadcrumb slds-list--horizontal">
				{trail.map((crumb, index) => (
					/* eslint-disable react/no-array-index-key */
					<li
						key={index} // There isn't any better reasonable way to identity these
						className="slds-breadcrumb__item slds-text-title--caps"
					>
						{crumb}
					</li>
				))}
			</ol>
		</nav>
	);
};

Breadcrumb.displayName = BREADCRUMB;

Breadcrumb.propTypes = {
	/**
	 * The assistive text for the breadcrumb trail
	 */
	assistiveText: PropTypes.string,
	/**
	 * An array of react elements presumably anchor elements.
	 */
	trail: PropTypes.array
};

Breadcrumb.defaultProps = {
	assistiveText: 'Breadcrumbs'
};

export default Breadcrumb;
