/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Filter List

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React, { Component, type ReactNode } from 'react';

// ## Constants
import { PANEL_FILTER_LIST } from '../../../utilities/constants';

import generateId from '../../../utilities/generate-id';

export interface PanelFilterListProps {
	/**
	 * Pass in `Filter` components
	 */
	children?: ReactNode;
}

/**
 * A list of Filters. This is a higher order component for filters that decorates the filter to work within a Filtering Panel. It also adds support for a Filter error label.
 */
class PanelFilterList extends Component<PanelFilterListProps> {
	static displayName = PANEL_FILTER_LIST;

	generatedId: string;

	constructor(props: PanelFilterListProps) {
		super(props);
		this.generatedId = generateId();
	}

	render() {
		const children = React.Children.map(this.props.children, (child, index) => {
			if (!React.isValidElement(child)) {
				return null;
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const childProps = child.props as any;
			const id = childProps.id
				? childProps.id
				: `${this.generatedId}-${index}`;

			let clonedChild;

			if (childProps.errorLabel) {
				clonedChild = React.cloneElement(child, {
					isError: true,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} as any);
			}

			return (
				<li className="slds-item slds-hint-parent">
					{clonedChild || child}
					{childProps.errorLabel ? (
						<p
							id={`${id}-error`}
							className="slds-text-color_error slds-m-top_xx-small"
						>
							{childProps.errorLabel}
						</p>
					) : null}
				</li>
			);
		});

		return (
			<ol className="slds-list_vertical slds-list_vertical-space">
				{children}
			</ol>
		);
	}
}

export default PanelFilterList;
