/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useEffect,
	useId,
	type MouseEvent,
	type ReactElement,
} from 'react';
import classNames from 'classnames';
import { VERTICAL_NAVIGATION } from '../../utilities/constants';
import { checkRequiredProps } from './check-props';
import componentDoc from './component.json';
import type { BadgeProps } from '../badge';
import type { IconProps } from '../icon';
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
	/** `Icon` rendered before the label. Its `size` sets the right margin. */
	icon?: ReactElement<IconProps>;
	/** `Badge` rendered after the label, aligned right */
	notificationBadge?: ReactElement<BadgeProps>;
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
	/**
	 * Called when an item is clicked, with the click event and `{ item }`. The navigation is
	 * controlled: update `selectedId` from this callback to change the selected item.
	 */
	onSelect: (
		event: MouseEvent<HTMLAnchorElement>,
		data: NavigationSelectData
	) => void;
	/**
	 * `id` of the selected item (required, controlled). Pass `null` when no item is selected.
	 */
	selectedId: string | null;
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
	selectedId,
}: VerticalNavigationProps): React.ReactElement => {
	const generatedId = useId();
	const rootId = propId || generatedId;

	// Selection is controlled. Before v11 a missing `selectedId` selected the
	// first item, so warn in development when it is omitted.
	useEffect(() => {
		checkRequiredProps(VERTICAL_NAVIGATION, { selectedId }, componentDoc);
	});

	return (
		<nav
			id={rootId}
			className={classNames('slds-nav-vertical', className as string)}
		>
			{categories.map((category) => {
				const categoryId = `${rootId}-${category.id}`;
				return (
					<div
						key={`${categoryId}-header`}
						className="slds-nav-vertical__section"
					>
						<h2 id={categoryId} className="slds-nav-vertical__title">
							{category.label}
						</h2>
						<ul key={categoryId}>
							{category.items.map((item) => (
								<Item
									key={item.id}
									item={item}
									isSelected={selectedId != null && item.id === selectedId}
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
