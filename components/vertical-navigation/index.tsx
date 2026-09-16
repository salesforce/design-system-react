/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, useMemo, type MouseEvent } from 'react';
import classNames from 'classnames';
import { VERTICAL_NAVIGATION } from '../../utilities/constants';
import Item from './private/item';

/**
 * Navigation item structure
 */
export interface NavigationItem {
	/** Unique identifier */
	id: string;
	/** Display label */
	label: string;
	/** URL for the link */
	url: string;
	/** Additional custom properties */
	[key: string]: unknown;
}

/**
 * Navigation category structure
 */
export interface NavigationCategory {
	/** Unique identifier */
	id: string;
	/** Category label */
	label: string;
	/** Items in this category */
	items: NavigationItem[];
}

/**
 * Selection event data
 */
export interface NavigationSelectData {
	item: NavigationItem;
}

/**
 * Props for the VerticalNavigation component
 */
export interface VerticalNavigationProps {
	/** Array of navigation categories */
	categories: NavigationCategory[];
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** HTML id */
	id?: string;
	/** Selection callback */
	onSelect?: (event: MouseEvent<HTMLAnchorElement>, data: NavigationSelectData) => void;
	/** Currently selected item ID */
	selectedId?: string;
}

/**
 * Vertical Navigation represents a list of links that either take the user
 * to another page or parts of the page the user is in.
 */
const VerticalNavigation = ({
	categories,
	className,
	id: propId,
	onSelect,
	selectedId: propSelectedId,
}: VerticalNavigationProps): React.ReactElement => {
	const generatedId = useId();
	const rootId = propId || generatedId;

	// Determine selected ID (default to first item if not specified)
	const selectedId = useMemo(() => {
		if (propSelectedId) {
			return propSelectedId;
		}
		if (categories.length > 0 && categories[0].items?.length > 0) {
			return categories[0].items[0].id;
		}
		return undefined;
	}, [propSelectedId, categories]);

	return (
		<nav
			id={rootId}
			className={classNames('slds-nav-vertical', className as string)}
		>
			{categories.map((category) => {
				const categoryId = `${rootId}-${category.id}`;
				return (
					<div key={`${categoryId}-header`} className="slds-nav-vertical__section">
						<h2 id={categoryId} className="slds-nav-vertical__title">
							{category.label}
						</h2>
						<ul key={categoryId}>
							{category.items.map((item) => (
								<Item
									key={item.id}
									item={item}
									isSelected={item.id === selectedId}
									categoryId={categoryId}
									onSelect={onSelect}
								/>
							))}
						</ul>
					</div>
				);
			})}
		</nav>
	);
};

VerticalNavigation.displayName = VERTICAL_NAVIGATION;

export default VerticalNavigation;















