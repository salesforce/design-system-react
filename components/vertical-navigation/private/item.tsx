/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, 'a simple javascript utility for conditionally
// joining classNames together.'
import classNames from 'classnames';

import { VERTICAL_NAVIGATION_ITEM } from '../../../utilities/constants';
import { type NavigationItem, type NavigationSelectData } from '../index';

export interface ItemProps {
	/**
	 * Item to be rendered.
	 */
	item: NavigationItem;
	/**
	 * Whether item is selected or not.
	 */
	isSelected?: boolean;
	/**
	 * ID of the category this item belongs to.
	 */
	categoryId: string;
	/**
	 * Function that will run whenever an item is selected.
	 */
	onSelect?: (
		event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
		data: NavigationSelectData
	) => void;
}

type ItemElement = HTMLAnchorElement | HTMLButtonElement;

const Item = ({
	isSelected = false,
	item,
	categoryId,
	onSelect,
}: ItemProps) => {
	const actionProps = {
		'aria-describedby': categoryId,
		'aria-current': isSelected ? ('page' as const) : undefined,
		onClick: (event: React.MouseEvent<ItemElement>) => {
			onSelect?.(event, { item });
		},
	};
	const contents = (
		<React.Fragment>
			{item.icon ? (
				<React.Fragment>
					{React.cloneElement(item.icon, {
						className: classNames(
							item.icon.props.className,
							`slds-m-right_${item.icon.props.size || 'medium'}`
						),
					})}
					{item.label}
				</React.Fragment>
			) : (
				item.label
			)}
			{item.notificationBadge ? (
				React.cloneElement(item.notificationBadge, {
					className: classNames(
						item.notificationBadge.props.className,
						'slds-col_bump-left'
					),
				})
			) : (
				<React.Fragment />
			)}
		</React.Fragment>
	);

	return (
		<li
			className={classNames('slds-nav-vertical__item', {
				'slds-is-active': isSelected,
			})}
		>
			{/* An item without a `url` goes nowhere, so it is a button rather than a `href="#"` link. */}
			{item.url ? (
				<a
					data-id={item.id}
					href={item.url}
					className="slds-nav-vertical__action"
					{...actionProps}
				>
					{contents}
				</a>
			) : (
				<button
					data-id={item.id}
					type="button"
					className="slds-button_reset slds-nav-vertical__action"
					{...actionProps}
				>
					{contents}
				</button>
			)}
		</li>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
Item.displayName = VERTICAL_NAVIGATION_ITEM;

export default Item;
