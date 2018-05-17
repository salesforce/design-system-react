/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Filter List

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ## Constants
import { PANEL_FILTER_LIST } from '../../../utilities/constants';

/**
 * A list of Filters. This is a higher order component for filters that decorates the filter to work within a Filtering Panel. It also adds support for a Filter error label.
 */
const PanelFilterList = createReactClass({
	displayName: PANEL_FILTER_LIST,

	propTypes () {
		return {
			/**
			 * Pass in `Filter` components
			 */
			children: PropTypes.node,
		};
	},

	componentWillMount () {
		this.generatedId = shortid.generate();
	},

	render () {
		const children = React.Children.map(this.props.children, (child, index) => {
			const id =
				child && child.props.id
					? child.props.id
					: `${this.generatedId}-${index}`;

			let clonedChild;

			if (child && child.props.errorLabel) {
				clonedChild = React.cloneElement(child, {
					isError: true,
				});
			}

			return child ? (
				<li className="slds-item slds-hint-parent">
					{clonedChild || child}
					{child.props.errorLabel ? (
						<p
							id={`${id}-error`}
							className="slds-text-color--error slds-m-top--xx-small"
						>
							{child.props.errorLabel}
						</p>
					) : null}
				</li>
			) : null;
		});

		return (
			<ol className="slds-list--vertical slds-list--vertical-space">
				{children}
			</ol>
		);
	},
});

export default PanelFilterList;
