/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Filter List

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React, { Component } from 'react';

// ## Constants
import { PANEL_FILTER_LIST } from '../../../utilities/constants';
import type { FilterProps } from '../../filter';
import type { ChildrenOf } from '../../../types/common';

import generateId from '../../../utilities/generate-id';

export interface PanelFilterListProps {
	/**
	 * `Filter` elements. A filter with an `errorLabel` shows it below the filter and gets `isError`.
	 */
	children?: ChildrenOf<FilterProps>;
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
			if (!React.isValidElement<FilterProps>(child)) {
				return null;
			}

			const childProps = child.props;
			const id = childProps.id || `${this.generatedId}-${index}`;

			// The filter's `aria-describedby` points at `${id}-error`, so it needs this id
			const clonedChild = childProps.errorLabel
				? React.cloneElement(child, {
						id,
						isError: childProps.isError ?? true,
					})
				: null;

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
